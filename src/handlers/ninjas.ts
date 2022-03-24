import { FastifyReply } from 'fastify'

import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { makeErrorOutput, notFoundError } from '~/services/errors'
import { makeWhere, validateIsEmpty } from '~/services/database'

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
        family: familyParentToIdToNinja.map(({ parentFrom, ...family }) => ({ ...family, details: parentFrom })),
        attributes: ninjaAttr,
      }))
    )
  )

export const getUniqueNinja = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
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
    makeWhere,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja
          .findFirst({
            where,
            rejectOnNotFound: true,
          })
          .tools(),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have tools.`)
  )

export const getNinjaFamily = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({ where, rejectOnNotFound: true }).familyParentToIdToNinja({
          select: { id: true, relationship: true, parentFrom: { select: { name: true } } },
        }),
      makeErrorOutput
    ),
    TE.map(families => families.map(({ parentFrom, ...family }) => ({ ...family, details: parentFrom }))),
    validateIsEmpty(`Ninja ${param} don't have family.`)
  )

export const getNinjaAttributes = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({ where, rejectOnNotFound: true }).ninjaAttr({
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

export const getNinjaJutsus = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where =>
        reply.server.prisma.ninja.findFirst({ where, rejectOnNotFound: true }).jutsus({
          include: { nature_type: true },
        }),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have jutsus.`)
  )

export const getNinjaTeams = (reply: FastifyReply, param: string) =>
  pipe(
    param,
    makeWhere,
    TE.tryCatchK(
      where => reply.server.prisma.ninja.findFirst({ where, rejectOnNotFound: true }).team(),
      makeErrorOutput
    ),
    validateIsEmpty(`Ninja ${param} don't have teams.`)
  )
