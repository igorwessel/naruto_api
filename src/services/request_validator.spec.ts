import { pipe } from 'fp-ts/function'
import { createValidatorCompiler } from './request_validator'
import * as t from 'io-ts'

const schema = t.type({
  ninja: t.string,
})

const makeValidationData = pipe(createValidatorCompiler<t.TypeOf<typeof schema>>(), inject =>
  inject({
    schema,
    httpPart: 'params',
    method: 'GET',
    url: 'a/:ninja',
  })
)

it.each([[{ ninja: '1' }], [{ ninja: 'naruto-uzumaki' }]])('should validate properly based in schema', ({ ninja }) => {
  return pipe(makeValidationData({ ninja }), result => expect(result).toStrictEqual({ value: { ninja } }))
})

it('should return error when not pass in validation of schema', () => {
  return pipe(makeValidationData({ ninja: 1 }), error => expect(error).toStrictEqual({ error: expect.anything() }))
})
