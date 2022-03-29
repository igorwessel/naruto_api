import { objectType } from 'nexus'

export const Occupation = objectType({
  name: 'Occupation',
  definition(t) {
    t.implements('Common')
  },
})
