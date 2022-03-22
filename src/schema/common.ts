import { interfaceType } from 'nexus'

export const Common = interfaceType({
  name: 'Common',
  definition(t) {
    t.int('id')
    t.string('name')
  },
})
