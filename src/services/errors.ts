import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

export type DefaultError = {
  error: string
  statusCode: number
  message: string
}

export const isDefaultError = (error: unknown): error is DefaultError => 'statusCode' in (error as DefaultError)

export const makeErrorOutput = (err: DefaultError | unknown): DefaultError => {
  if (isDefaultError(err)) {
    return err
  }

  return pipe(err, E.toError, err => ({ error: err.name, statusCode: 500, message: err.message }))
}

export const notFoundError = (message: string) => makeErrorOutput({ error: 'Not Found', statusCode: 404, message })
