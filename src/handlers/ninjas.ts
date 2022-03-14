import { FastifyReply } from 'fastify'
import { Prisma } from '@prisma/client'

import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'

import { pipe } from 'fp-ts/function'

import { isID } from '~/services/regex'
import { notFoundError } from '~/services/errors'

const makeWhereNinja = (isID: boolean) => (param: string): Prisma.NinjaWhereInput => {
  return isID
    ? {
        id: { equals: parseInt(param) },
      }
    : { name: { contains: param, mode: 'insensitive' } }
}

export const getUniqueNinja = async (reply: FastifyReply, param: string) => {
  return pipe(
    param,
    isID,
    makeWhereNinja,
    addInParam => addInParam(param),
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({
          where,
          include: { occupation: true, affiliation: true, clan: true, classification: true },
          rejectOnNotFound: true,
        }),
      E.toError
    ),
    TE.mapLeft(() => notFoundError(`Ninja ${param} not found.`))
  )
}
