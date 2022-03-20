import { FastifyReply } from 'fastify'

import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { makeErrorOutput, notFoundError } from '~/services/errors'
import { makeWhere, validateIsEmpty } from '~/services/database'

export const getTeams = (reply: FastifyReply, pagination: { limit: number; offset: number }) =>
  pipe(
    pagination,
    TE.tryCatchK(
      pagination =>
        reply.server.prisma.team.findMany({
          skip: pagination.offset,
          take: pagination.limit,
        }),
      makeErrorOutput
    )
  )

export const getTeam = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(where => reply.server.prisma.team.findFirst({ where, rejectOnNotFound: true }), makeErrorOutput),
    TE.mapLeft(() => notFoundError(`Team ${param} not found.`))
  )

export const getNinja = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where => reply.server.prisma.team.findFirst({ where, rejectOnNotFound: true }).ninja(),
      makeErrorOutput
    ),
    validateIsEmpty(`Team ${param} don't have ninjas.`)
  )
