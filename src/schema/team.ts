import { paginationArgs } from '~/schema/args'
import { extendType, objectType } from 'nexus'

export const Team = objectType({
  name: 'Team',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.nonNull.list.field('members', {
      type: 'Ninja',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.team.findUnique({ where: { id: _root.id } }).ninja(),
    })
    t.nonNull.list.field('affiliation', {
      type: 'Affiliation',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.team.findUnique({ where: { id: _root.id } }).affiliation(),
    })
  },
})

export const TeamQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('teams', {
      type: 'Team',
      args: paginationArgs,
      complexity: ({ args, childComplexity }) => childComplexity * args.limit,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.team.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
