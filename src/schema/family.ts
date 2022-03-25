import { objectType } from 'nexus'

export const Family = objectType({
  name: 'Family',
  definition(t) {
    t.string('relationship')
    t.field('details', {
      type: 'Ninja',
      complexity: 1,
      resolve: (_root, _, ctx) => ctx.prisma.family.findUnique({ where: { id: _root.id } }).parentFrom(),
    })
  },
})
