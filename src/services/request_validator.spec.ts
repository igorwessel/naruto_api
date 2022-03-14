import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { validatorCompiler } from './request_validator'
import { ParamsType, paramsType } from '~/types/params'

const makeValidationData = pipe(validatorCompiler<ParamsType, t.OutputOf<typeof paramsType>>(), inject =>
  inject({
    schema: paramsType,
    httpPart: 'params',
    method: 'GET',
    url: 'a/:ninja',
  })
)

it.each([[{ ninja: '1' }], [{ ninja: 'naruto-uzumaki' }]])('should validate properly based in schema', ({ ninja }) => {
  return pipe(makeValidationData({ ninja }), result => expect(result).toStrictEqual({ value: { ninja } }))
})

it('should return error when not pass in validation of schema', () => {
  return pipe(makeValidationData({ ninja: 'pascalCase' }), error =>
    expect(error).toStrictEqual({ error: expect.anything() })
  )
})
