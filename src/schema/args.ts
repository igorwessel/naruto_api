import { intArg, nonNull } from 'nexus'

export const args = {
  limit: nonNull(intArg({ default: 15 })),
  offset: nonNull(intArg({ default: 0 })),
}
