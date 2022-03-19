import { FastifyReply } from 'fastify'

import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { makeErrorOutput, notFoundError } from '~/services/errors'
import { makeWhere, validateIsEmpty } from '~/services/database'

export const getJutsus = (reply: FastifyReply, pagination: { limit: number; offset: number }) =>
  pipe(
    pagination,
    TE.tryCatchK(
      pagination =>
        reply.server.prisma.jutsu.findMany({
          skip: pagination.offset,
          take: pagination.limit,
        }),
      makeErrorOutput
    )
  )

export const getJutsu = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where =>
        reply.server.prisma.jutsu.findFirst({
          where,
          include: { class: true, classification: true, nature_type: true },
        }),
      makeErrorOutput
    ),
    TE.mapLeft(() => notFoundError(`Jutsu ${param} not found.`))
  )

export const getNinja = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(where => reply.server.prisma.jutsu.findFirst({ where }).ninja(), makeErrorOutput),
    validateIsEmpty(`Jutsu ${param} don't have ninjas.`)
  )
