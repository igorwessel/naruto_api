import { args } from '~/schema/args'
import { extendType, objectType } from 'nexus'

export const Tools = objectType({
  name: 'Tools',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.string('games')
    t.string('kanji')
    t.string('manga_panini')
    t.string('portugues')
    t.string('romaji')
    t.string('tv_brasileira')
    t.nonNull.list.field('ninjas', {
      type: 'Ninja',
      resolve: (_root, _, ctx) => ctx.prisma.tools.findUnique({ where: { id: _root.id || undefined } }).ninjas(),
    })
  },
})

export const ToolQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('tools', {
      type: 'Tools',
      args,
      resolve: (_root, _args, ctx) =>
        ctx.prisma.tools.findMany({
          skip: _args.offset,
          take: _args.limit,
        }),
    })
  },
})
