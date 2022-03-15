import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getNinjaRelation, getNinjas, getUniqueNinja } from '~/handlers/ninjas'

import { validatorCompiler } from '~/services/request_validator'
import { ParamsType, paramsType } from '~/types/params'
import { paginationCodec, PaginationType } from '~/types/pagination'

type NinjaParam = {
  ninja: string
}

export const routes = async (app: FastifyInstance): Promise<FastifyInstance> =>
  app
    .get<
      {
        Querystring: PaginationType
      },
      unknown,
      t.Type<PaginationType>
    >(
      '/ninjas',
      {
        schema: {
          querystring: paginationCodec,
        },
        validatorCompiler: validatorCompiler<PaginationType>(),
      },
      async (req, reply) => {
        const ninjas = await getNinjas(reply, {
          limit: parseInt(req.query.limit ?? '15'),
          offset: parseInt(req.query.offset ?? '0'),
        })

        return pipe(
          ninjas,
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(e => reply.send(e))
        )()
      }
    )
    .get<
      {
        Params: NinjaParam
      },
      unknown,
      t.Type<ParamsType>
    >(
      '/ninjas/:ninja',
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler<ParamsType>(),
      },
      async (req, reply) => {
        const ninja = await getUniqueNinja(reply, req.params.ninja)

        return pipe(
          ninja,
          TE.map(ninja => reply.send(ninja)),
          TE.mapLeft(e => reply.code(e.statusCode).send(e))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>('/ninjas/:ninja/tools', async (req, reply) => {
      const tools = await getNinjaRelation(reply, req.params.ninja)

      return pipe(
        tools,
        TE.map(tools => reply.send(tools)),
        TE.mapLeft(e => reply.code(e.statusCode).send(e))
      )()
    })
