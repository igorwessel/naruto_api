import { objectType } from 'nexus'

export const Season = objectType({
  name: 'Season',
  definition(t) {
    t.implements('Common')
  },
})
