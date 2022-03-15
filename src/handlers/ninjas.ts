import { FastifyReply } from 'fastify'
import { Prisma } from '@prisma/client'

import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'

import { flow, pipe } from 'fp-ts/function'

import { isID as validateID } from '~/services/regex'
import { notFoundError } from '~/services/errors'
import { sanitize } from '~/services/string'

const makeWhereNinja = (param: string) =>
  flow(
    validateID,
    (isId): Prisma.NinjaWhereInput =>
      isId
        ? {
            id: { equals: parseInt(param) },
          }
        : { name: { contains: sanitize(param), mode: 'insensitive' } }
  )

export const getNinjas = async (reply: FastifyReply, pagination: { limit: number; offset: number }) => {
  return pipe(
    pagination,
    TE.tryCatchK(
      pagination =>
        reply.server.prisma.ninja.findMany({
          skip: pagination.offset,
          take: pagination.limit,
          include: {
            occupation: true,
            affiliation: true,
            clan: true,
            classification: true,
            ninjaAttr: {
              select: {
                id: true,
                age: true,
                height: true,
                weight: true,
                ninjaRank: true,
                season: { select: { name: true } },
              },
            },
            jutsus: {
              include: { nature_type: true },
            },
            familyParentToIdToNinja: {
              select: {
                id: true,
                relationship: true,
                parentFrom: { select: { name: true } },
              },
            },
            tools: true,
            team: true,
          },
        }),
      E.toError
    ),
    TE.map(ninjas =>
      ninjas.map(({ familyParentToIdToNinja, ninjaAttr, ...ninja }) => ({
        ...ninja,
        family: familyParentToIdToNinja,
        attributes: ninjaAttr,
      }))
    )
  )
}

export const getUniqueNinja = async (reply: FastifyReply, param: string) => {
  return pipe(
    param,
    makeWhereNinja(param),
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

export const getNinjaRelation = async (reply: FastifyReply, param: string) => {
  return pipe(
    param,
    makeWhereNinja(param),
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja
          .findFirst({
            where,
            rejectOnNotFound: true,
          })
          .tools(),
      E.toError
    ),
    TE.mapLeft(() => notFoundError(`Ninja not have tools.`))
  )
}
