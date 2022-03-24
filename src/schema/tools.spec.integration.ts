import { createMercuriusTestClient } from 'mercurius-integration-testing'

import build from '~/app'
import { toolsQuery } from '~/__fixtures__/graphql'

const client = createMercuriusTestClient(build({ logger: false }))

it('should get tools', async () => {
  const { data } = await client.query(toolsQuery, { variables: { limit: 1, offset: 0 } })

  expect(data.tools).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "A Lenda de Um Ninja Determinado foi o primeiro livro de Jiraiya, escrito ao treinar os órfãos de Ame. A história segue as aventuras de um ninja chamado Naruto, nomeado por Jiraiya enquanto ele comia ramen. O personagem principal, Naruto, nunca desiste e promete quebrar a 'maldição' que foi mencionado na história. A 'maldição' mencionada representa os 'ciclos viciosos' de guerra, conflito e ódio, que ocupa o mundo ninja que Nagato uma vez falou sobre com Jiraiya.",
        "games": null,
        "id": 1,
        "kanji": "ド根性忍伝",
        "manga_panini": null,
        "name": "A Lenda de Um Ninja Determinado",
        "ninjas": Array [],
        "portugues": null,
        "romaji": "Dokonjō Ninden",
        "tv_brasileira": null,
      },
    ]
  `)
})
