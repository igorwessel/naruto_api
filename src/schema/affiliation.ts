import { objectType } from 'nexus'

export const Affiliation = objectType({
  name: 'Affiliation',
  definition(t) {
    t.implements('Common')
  },
})
