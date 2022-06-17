import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getNinja, getTool, getTools } from '~/handlers/tools'

import { paginationCodec, PaginationType } from '~/types/pagination'
import { idCodec, kebabCaseCodec } from '~/types/params'

type ToolParam = {
  tool: string
}

const paramsType = t.type({
  tool: t.union([idCodec, kebabCaseCodec]),
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
          getTools(reply, { limit: parseInt(req.query.limit ?? '15'), offset: parseInt(req.query.offset ?? '0') }),
          TE.map(tools => reply.send(tools)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: ToolParam }>(
      '/:tool',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getTool(reply, req.params.tool),
          TE.map(tool => reply.send(tool)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{ Params: ToolParam }>(
      '/:tool/ninjas',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinja(reply, req.params.tool),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
