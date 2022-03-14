import { FastifyInstance, FastifyRequest } from 'fastify'

import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getUniqueNinja } from '~/handlers/ninjas'

import { validatorCompiler } from '~/services/request_validator'
import { ParamsType, paramsType } from '~/types/params'

type RequestParam = FastifyRequest<{
  Params: {
    ninja: string
  }
}>

export const routes = async (app: FastifyInstance): Promise<FastifyInstance> =>
  app
    .get(
      `/ninjas/:ninja`,
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler<ParamsType>(),
      },
      async (req: RequestParam, reply) => {
        const ninja = await getUniqueNinja(reply, req.params.ninja)
        return pipe(
          ninja,
          TE.map(ninja => reply.send(ninja)),
          TE.mapLeft(e => reply.code(e.statusCode).send(e))
        )()
      }
    )
    .get('/ninjas', async (req, reply) => {
      reply.send('hello')
    })
