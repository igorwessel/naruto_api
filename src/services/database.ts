import { Prisma } from '@prisma/client'
import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { isID as validateID } from '~/services/regex'
import { sanitize } from '~/services/string'
import { notFoundError } from '~/services/errors'

export const makeWhere = flow(
  (param: string): [boolean, string] => [validateID(param), param],
  ([isID, param]): Prisma.NinjaWhereInput =>
    isID
      ? {
          id: { equals: parseInt(param) },
        }
      : { name: { contains: sanitize(param), mode: 'insensitive' } }
)

export const validateIsEmpty = flow(
  (message: string) =>
    <A>(arr: A[]) =>
      arr.length === 0 ? TE.left(notFoundError(message)) : TE.right(arr),
  TE.chain
)
