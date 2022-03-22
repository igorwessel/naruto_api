import { objectType } from 'nexus'

export const Classification = objectType({
  name: 'Classification',
  definition(t) {
    t.implements('Common')
  },
})
