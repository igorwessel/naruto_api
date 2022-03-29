import { paginationArgs } from '~/schema/args'

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
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).nature_type(),
    })
    t.nonNull.list.field('ninja_attributes', {
      type: 'NinjaAttributes',
      complexity: 1,
      resolve: (_root, _, ctx) =>
        ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).ninjaAttr({ include: { season: true } }),
    })
    t.nonNull.list.field('occupation', {
      type: 'Occupation',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).occupation(),
    })
    t.nonNull.list.field('team', {
      type: 'Team',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).team(),
    })
    t.nonNull.list.field('tools', {
      type: 'Tools',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).tools(),
    })
    t.nonNull.list.field('jutsus', {
      type: 'Jutsu',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).jutsus(),
    })
    t.nonNull.list.field('affiliation', {
      type: 'Affiliation',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).affiliation(),
    })
    t.nonNull.list.field('classification', {
      type: 'Classification',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).classification(),
    })
    t.nonNull.list.field('clan', {
      type: 'Clan',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.ninja.findUnique({ where: { id: _root.id } }).clan(),
    })
    t.nonNull.list.field('family', {
      type: 'Family',
      complexity: 1,
      resolve: (_root, _, ctx) =>
        ctx.prisma.ninja
          .findUnique({ where: { id: _root.id } })
          .familyParentToIdToNinja({ include: { parentFrom: true } }),
    })
  },
})

export const NinjaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('ninjas', {
      type: 'Ninja',
      args: paginationArgs,
      complexity: ({ args, childComplexity }) => childComplexity * args.limit,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.ninja.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
