import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { minMaxLimitCodec, positiveCodec } from './pagination'

describe('Min Max Limit', () => {
  it('should validate properly', () =>
    pipe(
      '30',
      minMaxLimitCodec.decode,
      TE.fromEither,
      TE.map(result => expect(result).toBe('30'))
    )())

  it('should return a error when is lower than 0', () =>
    pipe(
      '-1',
      minMaxLimitCodec.decode,
      TE.fromEither,
      TE.mapLeft(error =>
        expect(error[0].message).toBe('Invalid Limit. Please use a value greater than 0 and lower than 30.')
      )
    )())

  it('should return a error when is greater than 30', () =>
    pipe(
      '31',
      minMaxLimitCodec.decode,
      TE.fromEither,
      TE.mapLeft(error =>
        expect(error[0].message).toBe('Invalid Limit. Please use a value greater than 0 and lower than 30.')
      )
    )())
})

describe('Positive', () => {
  it('should validate properly', () =>
    pipe(
      '1',
      positiveCodec.decode,
      TE.fromEither,
      TE.map(result => expect(result).toBe('1'))
    )())

  it('should return a error when is lower than 0', () =>
    pipe(
      '-1',
      positiveCodec.decode,
      TE.fromEither,
      TE.mapLeft(error => expect(error[0].message).toBe('Invalid Positive. Please use a value greater than 0.'))
    )())
})
