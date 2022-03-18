import { FastifyReply } from 'fastify'
import { Prisma } from '@prisma/client'

import * as TE from 'fp-ts/TaskEither'
import { flow, pipe } from 'fp-ts/function'

import { isID as validateID } from '~/services/regex'
import { makeErrorOutput, notFoundError } from '~/services/errors'
import { sanitize } from '~/services/string'

const makeWhereNinja = flow(
  (param: string): [boolean, string] => [validateID(param), param],
  ([isID, param]): Prisma.NinjaWhereInput =>
    isID
      ? {
          id: { equals: parseInt(param) },
        }
      : { name: { contains: sanitize(param), mode: 'insensitive' } }
)

const isEmpty = (message: string) => <A = unknown>(arr: A[]) =>
  arr.length === 0 ? TE.left(notFoundError(message)) : TE.right(arr)

const validateIsEmpty = flow(isEmpty, TE.chain)

export const getNinjas = (reply: FastifyReply, pagination: { limit: number; offset: number }) =>
  pipe(
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
      makeErrorOutput
    ),
    TE.map(ninjas =>
      ninjas.map(({ familyParentToIdToNinja, ninjaAttr, ...ninja }) => ({
        ...ninja,
        family: familyParentToIdToNinja,
        attributes: ninjaAttr,
      }))
    )
  )

export const getUniqueNinja = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhereNinja,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({
          where,
          include: { occupation: true, affiliation: true, clan: true, classification: true },
          rejectOnNotFound: true,
        }),
      makeErrorOutput
    ),
    TE.mapLeft(() => notFoundError(`Ninja ${param} not found.`))
  )

export const getNinjaTools = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhereNinja,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja
          .findFirst({
            where,
          })
          .tools(),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have tools.`)
  )

export const getNinjaFamily = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhereNinja,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({ where }).familyParentToIdToNinja({
          select: { id: true, relationship: true, parentFrom: { select: { name: true } } },
        }),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have family.`)
  )

export const getNinjaAttributes = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhereNinja,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({ where }).ninjaAttr({
          select: {
            id: true,
            age: true,
            height: true,
            weight: true,
            ninjaRank: true,
            season: { select: { name: true } },
          },
        }),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have attributes.`)
  )
