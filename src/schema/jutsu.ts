import { args } from '~/schema/args'
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
      resolve: (_root, _, ctx) => ctx.prisma.jutsu.findUnique({ where: { id: _root.id || undefined } }).nature_type(),
    })
    t.nonNull.list.field('classification', {
      type: 'Classification',
      resolve: (_root, _, ctx) =>
        ctx.prisma.jutsu.findUnique({ where: { id: _root.id || undefined } }).classification(),
    })
    t.nonNull.list.field('class', {
      type: 'Class',
      resolve: (_root, _, ctx) => ctx.prisma.jutsu.findUnique({ where: { id: _root.id || undefined } }).class(),
    })
  },
})

export const JutsuQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('jutsus', {
      type: 'Jutsu',
      args,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.jutsu.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})