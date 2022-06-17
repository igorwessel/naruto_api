import path from 'path'
import fastify, { FastifyServerOptions } from 'fastify'
import { validatePlugin } from 'nexus-validate'
import altairFastify from 'altair-fastify-plugin'

import mercurius from 'mercurius'

import { makeSchema, queryComplexityPlugin } from 'nexus'

import { createComplexityRule, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity'
import depthLimit from 'graphql-depth-limit'

import { routes as ninjasRoutes } from '~/routes/ninjas'
import { routes as toolsRoutes } from '~/routes/tools'
import { routes as teamsRoutes } from '~/routes/teams'
import { routes as jutsusRoutes } from '~/routes/jutsus'

import * as types from '~/schema'
import { createValidatorCompiler } from '~/services/request_validator'

import prismaPlugin from '~/plugins/prisma'

const app = (opts: FastifyServerOptions) => {
  const _app = fastify(opts)

  _app.register(import('@fastify/cors'), { origin: true })
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
    ...(process.env.NODE_ENV === 'development' && {
      contextType: {
        module: path.join(__dirname, 'types/context.ts'),
        export: 'Context',
      },
    }),
    features: {
      abstractTypeStrategies: {
        resolveType: false,
      },
    },
    outputs: {
      typegen: path.join(__dirname, '..', 'node_modules/@types/nexus-typegen/index.d.ts'),
      schema: path.join(__dirname, '..', 'naruto_api.graphql'),
    },
    shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
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
    app.register(import('@fastify/rate-limit'), { max: 100, timeWindow: '5 minute' })

    app.setValidatorCompiler(createValidatorCompiler())

    app.register(toolsRoutes, { prefix: '/tools' })
    app.register(teamsRoutes, { prefix: '/teams' })
    app.register(jutsusRoutes, { prefix: '/jutsus' })
    app.register(ninjasRoutes, { prefix: '/ninjas' })
    done()
  })

  return _app
}

export default app
