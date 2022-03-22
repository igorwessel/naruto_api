import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { args } from '~/schema/args'

import { extendType, objectType } from 'nexus'

export const Ninja = objectType({
  name: 'Ninja',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.string('sex')
    t.string('birthdate')
    t.string('specie')
    t.string('status')
    t.string('status')
    t.string('blood_type')
    t.string('academy_grad_age')
    t.string('chunin_prom_age')
    t.string('ninja_registration')
    t.nonNull.list.field('nature_type', {
      type: 'NatureType',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).nature_type(),
    })
    t.nonNull.list.field('ninja_attributes', {
      type: 'NinjaAttributes',
      resolve: async (_root, _, ctx) => {
        const attributes = await ctx.prisma.ninja
          .findUnique({ where: { id: _root.id || undefined } })
          .ninjaAttr({ include: { season: true } })

        return pipe(
          attributes,
          A.map(({ season, ...attributes }) => ({ season: season?.name, ...attributes }))
        )
      },
    })
    t.nonNull.list.field('occupation', {
      type: 'Occupation',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).occupation(),
    })
    t.nonNull.list.field('team', {
      type: 'Team',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).team(),
    })
    t.nonNull.list.field('tools', {
      type: 'Tools',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).tools(),
    })
    t.nonNull.list.field('jutsus', {
      type: 'Jutsu',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).jutsus(),
    })
    t.nonNull.list.field('affiliation', {
      type: 'Affiliation',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).affiliation(),
    })
    t.nonNull.list.field('classification', {
      type: 'Classification',
      resolve: (_root, _, ctx) =>
        ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).classification(),
    })
    t.nonNull.list.field('clan', {
      type: 'Clan',
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id || undefined } }).clan(),
    })
    t.nonNull.list.field('family', {
      type: 'Family',
      resolve: (_root, _, ctx) =>
        ctx.prisma.ninja
          .findUnique({ where: { id: _root.id || undefined } })
          .familyParentToIdToNinja({ include: { parentFrom: true } }),
    })
  },
})

export const NinjaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('ninjas', {
      type: 'Ninja',
      args,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.ninja.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
