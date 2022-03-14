type DefaultErrorInput = {
  error: string
  statusCode: number
  message: string
}

export const makeErrorOutput = ({ error, statusCode, message }: DefaultErrorInput) => ({
  statusCode,
  error,
  message,
})

export const notFoundError = (message: string) => makeErrorOutput({ error: 'Not Found', statusCode: 404, message })
