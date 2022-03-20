import { FastifyReply } from 'fastify'

import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { makeErrorOutput, notFoundError } from '~/services/errors'
import { makeWhere, validateIsEmpty } from '~/services/database'

export const getTools = (reply: FastifyReply, pagination: { limit: number; offset: number }) =>
  pipe(
    pagination,
    TE.tryCatchK(
      pagination =>
        reply.server.prisma.tools.findMany({
          skip: pagination.offset,
          take: pagination.limit,
        }),
      makeErrorOutput
    )
  )

export const getTool = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(where => reply.server.prisma.tools.findFirst({ where, rejectOnNotFound: true }), makeErrorOutput),
    TE.mapLeft(() => notFoundError(`Tool ${param} not found.`))
  )

export const getNinja = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where => reply.server.prisma.tools.findFirst({ where, rejectOnNotFound: true }).ninjas(),
      makeErrorOutput
    ),
    validateIsEmpty(`Tool ${param} don't have ninjas.`)
  )
