import { pipe } from 'fp-ts/function'
import { makeErrorOutput, notFoundError } from './errors'

it('should make a error', () => {
  return pipe({ error: 'Internal Error', statusCode: 500, message: 'Something Wrong!' }, makeErrorOutput, result =>
    expect(result).toStrictEqual({ error: 'Internal Error', statusCode: 500, message: 'Something Wrong!' })
  )
})

it('should return a not found error', () => {
  return pipe('Is not found error!', notFoundError, result =>
    expect(result).toStrictEqual({
      error: expect.any(String),
      statusCode: 404,
      message: 'Is not found error!',
    })
  )
})
