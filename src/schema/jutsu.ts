import { paginationArgs } from '~/schema/args'
import { extendType, objectType } from 'nexus'

export const Jutsu = objectType({
  name: 'Jutsu',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.string('games')
    t.string('hand_seals')
    t.string('kanji')
    t.string('manga_panini')
    t.string('portugues')
    t.string('range')
    t.string('rank')
    t.string('romaji')
    t.string('tv_brasileira')
    t.nonNull.list.field('nature', {
      type: 'NatureType',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.jutsu.findUnique({ where: { id: _root.id } }).nature_type(),
    })
    t.nonNull.list.field('classification', {
      type: 'Classification',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.jutsu.findUnique({ where: { id: _root.id } }).classification(),
    })
    t.nonNull.list.field('class', {
      type: 'Class',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.jutsu.findUnique({ where: { id: _root.id } }).class(),
    })
  },
})

export const JutsuQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('jutsus', {
      type: 'Jutsu',
      args: paginationArgs,
      complexity: ({ args, childComplexity }) => childComplexity * args.limit,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.jutsu.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
