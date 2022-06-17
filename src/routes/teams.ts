import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getNinja, getTeam, getTeams } from '~/handlers/teams'

import { paginationCodec, PaginationType } from '~/types/pagination'
import { idCodec, kebabCaseCodec } from '~/types/params'

type TeamParam = {
  team: string
}

const paramsType = t.type({
  team: t.union([idCodec, kebabCaseCodec]),
})

export const routes = async (app: FastifyInstance): Promise<FastifyInstance> =>
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
          getTeams(reply, { limit: parseInt(req.query.limit ?? '15'), offset: parseInt(req.query.offset ?? '0') }),
          TE.map(teams => reply.send(teams)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: TeamParam }>(
      '/:team',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getTeam(reply, req.params.team),
          TE.map(team => reply.send(team)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{ Params: TeamParam }>(
      '/:team/ninjas',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinja(reply, req.params.team),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
