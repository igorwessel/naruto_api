import { objectType } from 'nexus'

export const NatureType = objectType({
  name: 'NatureType',
  definition(t) {
    t.int('id')
    t.boolean('kekkei_genkai')
    t.boolean('kekkei_tota')
    t.string('name')
  },
})
