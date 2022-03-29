import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import build from '~/app'

const app = build({ logger: false })
const BASE_ROUTE = '/ninjas'
const NARUTO_UZUMAKI_ROUTE = `${BASE_ROUTE}/802`

afterAll(() => {
  app.close()
})

it('should get ninjas', () => {
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

it('should paginate ninjas', () => {
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

it('should limit of total ninjas returned', () => {
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
  ['802', 'id', 802],
  ['naruto-uzumaki', 'kebab-case', 802],
])('should get ninja with %s in format %s', (param, _, id) => {
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

it('should get error 404 when not found ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/1550`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get family from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${NARUTO_UZUMAKI_ROUTE}/family`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should get error 404 when not found family from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/1/family`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get attributes from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${NARUTO_UZUMAKI_ROUTE}/attributes`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should get error 404 when not found attributes from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/5/attributes`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get tools from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${NARUTO_UZUMAKI_ROUTE}/tools`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      const tools = response.json()
      expect(tools[0]).toMatchInlineSnapshot(`
        Object {
          "description": null,
          "games": null,
          "id": 17,
          "kanji": "六道の棒りくどうのぼう",
          "mangaPanini": null,
          "name": "Bastão do Seis Caminhos",
          "portugues": "Bastão do Seis Caminhos",
          "romaji": "Rikudō no Bō",
          "tvBrasileira": null,
        }
      `)
    })
  )()
})

it('should get error 404 when not found tools from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/3/tools`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get teams from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${NARUTO_UZUMAKI_ROUTE}/teams`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should get error 404 when not found teams from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/3/teams`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})

it('should get jutsus from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${NARUTO_UZUMAKI_ROUTE}/jutsus`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchSnapshot()
    })
  )()
})

it('should get error 404 when not found jutsus from a ninja', () => {
  return pipe(
    app,
    TE.tryCatchK(
      app =>
        app.inject({
          url: `${BASE_ROUTE}/5/jutsus`,
        }),
      E.toError
    ),
    TE.map(response => {
      expect(response.statusCode).toBe(404)
      expect(response.json()).toMatchObject({ statusCode: 404, error: 'Not Found' })
    })
  )()
})
