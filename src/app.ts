import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { routes as ninjasRoutes } from '~/routes/ninjas'
import prismaPlugin from '~/plugins/prisma'

export const app = fastify({ logger: true })

app.register(fastifyCors, { origin: true })
app.register(prismaPlugin)

app.register(ninjasRoutes, { prefix: '/api/v1' })

app.listen(process.env.PORT ?? 3000, '0.0.0.0').catch(err => {
  app.log.error(err)
  process.exit(1)
})
