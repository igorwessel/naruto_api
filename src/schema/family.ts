import { objectType } from 'nexus'

export const Family = objectType({
  name: 'Family',
  definition(t) {
    t.string('relationship')
    t.field('details', {
      type: 'Ninja',
      resolve: (_root, _, ctx) => ctx.prisma.family.findUnique({ where: { id: _root.id || undefined } }).parentFrom(),
    })
  },
})
