import { intArg, nonNull } from 'nexus'

export const paginationArgs = {
  limit: nonNull(intArg({ default: 15 })),
  offset: nonNull(intArg({ default: 0 })),
}
