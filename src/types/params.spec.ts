import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { idCodec, kebabCaseCodec } from './params'

describe('kebab-case', () => {
  it('should validate a string with kebab-case properly', () =>
    pipe(
      'naruto-uzumaki',
      kebabCaseCodec.decode,
      TE.fromEither,
      TE.map(result => expect(result).toBe('naruto-uzumaki'))
    )())

  it.each([['PascalCase'], ['snake_case'], ['camelCase']])('should not accept a string when is %s', caseType =>
    pipe(
      caseType,
      kebabCaseCodec.decode,
      TE.fromEither,
      TE.mapLeft(error =>
        expect(error[0].message).toBe(
          "Invalid kebab-case. Please use lowercase letters and spaces need to be substitute with '-'."
        )
      )
    )()
  )
})

describe('ID', () => {
  it('should validate a ID properly', () =>
    pipe(
      '123',
      idCodec.decode,
      TE.fromEither,
      TE.map(result => expect(result).toBe('123'))
    )())

  it('should validate a ID properly', () =>
    pipe(
      'naruto-uzumaki',
      idCodec.decode,
      TE.fromEither,
      TE.mapLeft(error => expect(error[0].message).toBe('Invalid ID. Please use numbers.'))
    )())
})
