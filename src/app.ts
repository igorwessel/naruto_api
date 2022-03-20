import fastify, { FastifyServerOptions } from 'fastify'
import fastifyCors from 'fastify-cors'

import { routes as ninjasRoutes } from '~/routes/ninjas'
import { routes as toolsRoutes } from '~/routes/tools'
import { routes as teamsRoutes } from '~/routes/teams'
import { routes as jutsusRoutes } from '~/routes/jutsus'

import prismaPlugin from '~/plugins/prisma'

const app = (opts: FastifyServerOptions = { logger: true }) => {
  const _app = fastify(opts)

  _app.register(fastifyCors, { origin: true })
  _app.register(prismaPlugin)

  _app.register(toolsRoutes, { prefix: '/api/v1/tools' })
  _app.register(teamsRoutes, { prefix: '/api/v1/teams' })
  _app.register(jutsusRoutes, { prefix: '/api/v1/jutsus' })
  _app.register(ninjasRoutes, { prefix: '/api/v1/ninjas' })

  return _app
}

export default app
