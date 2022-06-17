import { FastifyInstance } from 'fastify'

import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import {
  getNinjaAttributes,
  getNinjaFamily,
  getNinjaJutsus,
  getNinjas,
  getNinjaTeams,
  getNinjaTools,
  getUniqueNinja,
} from '~/handlers/ninjas'

import { idCodec, kebabCaseCodec } from '~/types/params'
import { paginationCodec, PaginationType } from '~/types/pagination'

type NinjaParam = {
  ninja: string
}

const paramsType = t.type({
  ninja: t.union([idCodec, kebabCaseCodec]),
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
          getNinjas(reply, {
            limit: parseInt(req.query.limit ?? '15'),
            offset: parseInt(req.query.offset ?? '0'),
          }),
          TE.map(ninjas => reply.send(ninjas)),
          TE.mapLeft(e => reply.send(e))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getUniqueNinja(reply, req.params.ninja),
          TE.map(ninja => reply.send(ninja)),
          TE.mapLeft(e => reply.code(e.statusCode).send(e))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja/tools',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinjaTools(reply, req.params.ninja),
          TE.map(tools => reply.send(tools)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja/family',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinjaFamily(reply, req.params.ninja),
          TE.map(family => reply.send(family)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja/attributes',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinjaAttributes(reply, req.params.ninja),
          TE.map(attributes => reply.send(attributes)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja/jutsus',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinjaJutsus(reply, req.params.ninja),
          TE.map(jutsus => reply.send(jutsus)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
    .get<{
      Params: NinjaParam
    }>(
      '/:ninja/teams',
      {
        schema: {
          params: paramsType,
        },
      },
      (req, reply) => {
        pipe(
          getNinjaTeams(reply, req.params.ninja),
          TE.map(jutsus => reply.send(jutsus)),
          TE.mapLeft(err => reply.code(err.statusCode).send(err))
        )()
      }
    )
