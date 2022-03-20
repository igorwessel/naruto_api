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
    })
  },
})

export const NinjaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('ninjas', {
      type: 'Ninja',
      resolve: (_root, _args, ctx) => ctx.prisma.ninja.findMany(),
    })
  },
})
