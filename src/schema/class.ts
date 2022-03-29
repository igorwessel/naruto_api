import { objectType } from 'nexus'

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.implements('Common')
  },
})
