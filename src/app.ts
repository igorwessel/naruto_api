import path from 'path'
import fastify, { FastifyServerOptions } from 'fastify'
import fastifyRateLimit from 'fastify-rate-limit'
import fastifyCors from 'fastify-cors'
import { validatePlugin } from 'nexus-validate'
import altairFastify from 'altair-fastify-plugin'

import mercurius from 'mercurius'

import { makeSchema, queryComplexityPlugin } from 'nexus'

import createComplexityRule, { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity'
import depthLimit from 'graphql-depth-limit'

import { routes as ninjasRoutes } from '~/routes/ninjas'
import { routes as toolsRoutes } from '~/routes/tools'
import { routes as teamsRoutes } from '~/routes/teams'
import { routes as jutsusRoutes } from '~/routes/jutsus'

import * as types from '~/schema'

import prismaPlugin from '~/plugins/prisma'

const app = (opts: FastifyServerOptions) => {
  const _app = fastify(opts)

  _app.register(fastifyCors, { origin: true })
  _app.register(prismaPlugin)

  const schema = makeSchema({
    types,
    sourceTypes: {
      modules: [
        {
          module: require.resolve('.prisma/client/index.d.ts'),
          alias: 'prisma',
        },
      ],
    },
    contextType: {
      module: path.join(__dirname, 'types/context.ts'),
      export: 'Context',
    },
    features: {
      abstractTypeStrategies: {
        resolveType: false,
      },
    },
    outputs: {
      typegen: path.join(__dirname, '..', 'node_modules/@types/nexus-typegen/index.d.ts'),
      schema: path.join(__dirname, '..', 'naruto_api.graphql'),
    },
    plugins: [validatePlugin(), queryComplexityPlugin()],
  })

  _app.register(mercurius, {
    schema,
    context: (_, { server: { prisma } }) => ({ prisma }),
    path: '/graphql',
    graphiql: false,
    ide: false,
    cache: false,
    validationRules: ({ operationName, variables }) => [
      depthLimit(10),
      createComplexityRule({
        operationName,
        maximumComplexity: 1000,
        estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 0 })],
        variables,
      }),
    ],
  })

  _app.register(altairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
  })

  _app.register((app, _, done) => {
    app.register(fastifyRateLimit, { max: 100, timeWindow: '5 minute' })
    app.register(toolsRoutes, { prefix: '/tools' })
    app.register(teamsRoutes, { prefix: '/teams' })
    app.register(jutsusRoutes, { prefix: '/jutsus' })
    app.register(ninjasRoutes, { prefix: '/ninjas' })
    done()
  })

  return _app
}

export default app
