import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { getNinja, getTool, getTools } from '~/handlers/tools'

import { validatorCompiler } from '~/services/request_validator'
import { paginationCodec, PaginationType } from '~/types/pagination'
import { idCodec, kebabCaseCodec } from '~/types/params'

type ToolParam = {
  tool: string
}

const paramsType = t.type({
  tool: t.union([idCodec, kebabCaseCodec]),
})

type ParamsType = t.TypeOf<typeof paramsType>

export const routes = async (app: FastifyInstance): Promise<FastifyInstance> =>
  app
    .get<
      {
        Querystring: PaginationType
      },
      unknown,
      t.Type<PaginationType>
    >(
      '/',
      {
        schema: {
          querystring: paginationCodec,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getTools(reply, { limit: parseInt(req.query.limit ?? '15'), offset: parseInt(req.query.offset ?? '0') }),
          TE.map(tools => reply.send(tools)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: ToolParam }, unknown, t.Type<ParamsType>>(
      '/:tool',
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getTool(reply, req.params.tool),
          TE.map(tool => reply.send(tool)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
    .get<{ Params: ToolParam }, unknown, t.Type<ParamsType>>(
      '/:tool/ninjas',
      {
        schema: {
          params: paramsType,
        },
        validatorCompiler: validatorCompiler(),
      },
      (req, reply) => {
        pipe(
          getNinja(reply, (req.params as { tool: string }).tool),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(err => reply.send(err))
        )()
      }
    )
