import { args } from '~/schema/args'
import { extendType, objectType } from 'nexus'

export const Team = objectType({
  name: 'Team',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.nonNull.list.field('members', {
      type: 'Ninja',
      resolve: (_root, _, ctx) => ctx.prisma.team.findUnique({ where: { id: _root.id ?? undefined } }).ninja(),
    })
    t.nonNull.list.field('affiliation', {
      type: 'Affiliation',
      resolve: (_root, _, ctx) => ctx.prisma.team.findUnique({ where: { id: _root.id || undefined } }).affiliation(),
    })
  },
})

export const TeamQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('teams', {
      type: 'Team',
      args,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.team.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
