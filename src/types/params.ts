import * as t from 'io-ts'
import { withMessage } from 'io-ts-types/lib/withMessage'
import { isKebabCase, isID } from '~/services/regex'

type KebabCaseBrand = {
  readonly KebabCase: unique symbol
}

export const kebabCaseCodec = withMessage(
  t.brand(t.string, (value): value is t.Branded<string, KebabCaseBrand> => isKebabCase(value), 'KebabCase'),
  () => "Invalid kebab-case. Please use lowercase letters and spaces need to be substitute with '-'."
)

export type KebabCase = t.TypeOf<typeof kebabCaseCodec>

type IDBrand = {
  readonly ID: unique symbol
}

export const idCodec = withMessage(
  t.brand(t.string, (value): value is t.Branded<string, IDBrand> => isID(value), 'ID'),
  () => 'Invalid ID. Please use numbers.'
)

export type ID = t.TypeOf<typeof idCodec>

export const paramsType = t.type({
  ninja: t.union([idCodec, kebabCaseCodec]),
})

export type ParamsType = t.TypeOf<typeof paramsType>
