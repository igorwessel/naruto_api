import { createMercuriusTestClient } from 'mercurius-integration-testing'

import build from '~/app'
import { teamsQuery } from '~/__fixtures__/graphql'

const client = createMercuriusTestClient(build({ logger: false }))

it('should get teams', async () => {
  const { data } = await client.query(teamsQuery, { variables: { limit: 1, offset: 0 } })

  expect(data.teams).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "Os 11 de Konoha (木ノ葉の11人, Konoha no Jūichinin, TV Brasileira: 11 da Folha) é o apelido coletivo de quatro times de Genin de Konoha, liderados por Kakashi Hatake, Asuma Sarutobi, Kurenai Yūhi e Might Guy respectivamente, com exceção de Sasuke Uchiha.",
        "id": 1,
        "name": "11 de Konoha",
      },
    ]
  `)
})
