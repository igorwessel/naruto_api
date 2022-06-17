import { FastifySchemaCompiler } from 'fastify'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { failure } from 'io-ts/PathReporter'

export const createValidatorCompiler =
  <A>(): FastifySchemaCompiler<t.Decoder<unknown, A>> =>
  ({ schema }) =>
  (data: unknown) => {
    return pipe(
      data,
      schema.decode,
      E.mapLeft(failure),
      E.foldW(
        error => ({ error: new Error(error.join(', ')) }),
        value => ({ value })
      )
    )
  }
