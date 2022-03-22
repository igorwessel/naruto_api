import { objectType } from 'nexus'

export const NinjaAttributes = objectType({
  name: 'NinjaAttributes',
  definition(t) {
    t.string('age')
    t.string('height')
    t.string('ninja_rank')
    t.string('season')
    t.string('weight')
  },
})
