import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import build from '~/app'

const app = build({ logger: false })
const BASE_ROUTE = '/jutsus'

afterAll(() => {
  app.close()
})

it('should get jutsus', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: BASE_ROUTE,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it.each([
  ['limit', '35'],
  ['offset', '-1'],
])('should get bad request when pass invalid query params', (query, value) => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: BASE_ROUTE,
          query: {
            [query]: value,
          },
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(400)
      expect(response.json()).toMatchObject({ statusCode: 400, error: 'Bad Request' })
    })
  )()
})

it('should paginate jutsus', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: BASE_ROUTE,
          query: {
            offset: '1',
          },
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should limit of total jutsus returned', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: BASE_ROUTE,
          query: {
            limit: '2',
          },
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toHaveLength(2)
    })
  )()
})

it.each([
  ['1', 'id', 1],
  ['a-herança-da-vontade-do-fogo', 'kebab-case', 2],
])('should get team with %s in format %s', (param, _, id) => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/${param}`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchObject({ id })
    })
  )()
})

it('should get bad request when pass invalid param', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/pascalCase`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(400)
      expect(response.json()).toMatchObject({ statusCode: 400, error: 'Bad Request' })
    })
  )()
})

it('should get error 404 when not found jutsu', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/100000`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get ninjas from a jutsu', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/1/ninjas`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should get error 404 when not found ninjas from a jutsu', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/a-herança-da-vontade-do-fogo/ninjas`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})
