import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getJutsu, getJutsus, getNinja } from '~/handlers/jutsus'

import { paginationCodec, PaginationType } from '~/types/pagination'
import { idCodec, kebabCaseCodec } from '~/types/params'

type JutsuParam = {
  jutsu: string
}

const paramsType = t.type({
  jutsu: t.union([idCodec, kebabCaseCodec]),
})

export const routes = (app: FastifyInstance): FastifyInstance =>
  app
    .get<{
      Querystring: PaginationType
    }>(
      '/',
      {
        schema: {
          querystring: paginationCodec,
        },
      },
      (req, reply) => {
        pipe(
          getJutsus(reply, { limit: parseInt(req.query.limit ?? '15'), offset: parseInt(req.query.offset ?? '0') }),
          TE.map(jutsus => reply.send(jutsus)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: JutsuParam }>(
      '/:jutsu',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getJutsu(reply, req.params.jutsu),
          TE.map(jutsu => reply.send(jutsu)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{ Params: JutsuParam }>(
      '/:jutsu/ninjas',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinja(reply, req.params.jutsu),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
