import { objectType } from 'nexus'

export const Clan = objectType({
  name: 'Clan',
  definition(t) {
    t.implements('Common')
  },
})
