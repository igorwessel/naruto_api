import * as t from 'io-ts'
import { withMessage } from 'io-ts-types/lib/withMessage'

type MinMaxLimitBrand = {
  readonly MinMaxLimit: unique symbol
}

export const minMaxLimitCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, MinMaxLimitBrand> => parseInt(value) > 0 && parseInt(value) <= 30,
    'MinMaxLimit'
  ),
  () => 'Invalid Limit. Please use a value greater than 0 and lower than 30.'
)

export type MinMaxLimit = t.TypeOf<typeof minMaxLimitCodec>

type PositiveBrand = {
  readonly Positive: unique symbol
}

export const positiveCodec = withMessage(
  t.brand(t.string, (value): value is t.Branded<string, PositiveBrand> => parseInt(value) >= 0, 'Positive'),
  () => 'Invalid Positive. Please use a value greater than 0.'
)

export type Positive = t.TypeOf<typeof positiveCodec>

export const paginationCodec = t.partial({
  limit: minMaxLimitCodec,
  offset: positiveCodec,
})

export type PaginationType = t.TypeOf<typeof paginationCodec>
