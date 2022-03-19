import fastify from 'fastify'
import fastifyCors from 'fastify-cors'

import { routes as ninjasRoutes } from '~/routes/ninjas'
import { routes as toolsRoutes } from '~/routes/tools'
import { routes as teamsRoutes } from '~/routes/teams'

import prismaPlugin from '~/plugins/prisma'

export const app = fastify({ logger: true })

app.register(fastifyCors, { origin: true })
app.register(prismaPlugin)

app.register(toolsRoutes, { prefix: '/api/v1/tools' })
app.register(teamsRoutes, { prefix: '/api/v1/teams' })
app.register(ninjasRoutes, { prefix: '/api/v1/ninjas' })

app.listen(process.env.PORT ?? 3000, '0.0.0.0').catch(err => {
  app.log.error(err)
  process.exit(1)
})
