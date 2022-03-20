import path from 'path'
import fastify, { FastifyServerOptions } from 'fastify'
import fastifyCors from 'fastify-cors'
import altairFastify from 'altair-fastify-plugin'

import mercurius from 'mercurius'
import { makeSchema } from 'nexus'

import { routes as ninjasRoutes } from '~/routes/ninjas'
import { routes as toolsRoutes } from '~/routes/tools'
import { routes as teamsRoutes } from '~/routes/teams'
import { routes as jutsusRoutes } from '~/routes/jutsus'

import * as types from '~/schema'

import prismaPlugin from '~/plugins/prisma'

const app = (opts: FastifyServerOptions = { logger: true }) => {
  const _app = fastify(opts)

  _app.register(fastifyCors, { origin: true })
  _app.register(prismaPlugin)

  const schema = makeSchema({
    types,
    outputs: {
      typegen: path.join(__dirname, '..', 'nexus-typegen.ts'), // 2
      schema: path.join(__dirname, '..', 'schema.graphql'), // 3
    },
  })

  _app.register(mercurius, {
    schema,
    context: (_, { server: { prisma } }) => ({ prisma }),
    path: '/graphql',
    graphiql: false,
    ide: false,
  })

  _app.register(altairFastify, {
    path: '/api/v1/graphql',
    baseURL: '/api/v1/graphql/',
    endpointURL: '/graphql',
  })

  _app.register(toolsRoutes, { prefix: '/api/v1/tools' })
  _app.register(teamsRoutes, { prefix: '/api/v1/teams' })
  _app.register(jutsusRoutes, { prefix: '/api/v1/jutsus' })
  _app.register(ninjasRoutes, { prefix: '/api/v1/ninjas' })

  return _app
}

export default app
