import { createMercuriusTestClient } from 'mercurius-integration-testing'

import build from '~/app'
import { jutsusQuery } from '~/__fixtures__/graphql'

const client = createMercuriusTestClient(build({ logger: false }))

it('should get jutsus', async () => {
  const { data } = await client.query(jutsusQuery, { variables: { limit: 1, offset: 0 } })

  expect(data.jutsus).toMatchInlineSnapshot(`
    Array [
      Object {
        "class": Array [
          Object {
            "id": 1,
            "name": "Ofensivo",
          },
          Object {
            "id": 2,
            "name": "Suplementar",
          },
        ],
        "classification": Array [
          Object {
            "id": 1,
            "name": "Kekkei Genkai",
          },
          Object {
            "id": 2,
            "name": "Senjutsu",
          },
          Object {
            "id": 3,
            "name": "Ninjutsu",
          },
        ],
        "description": "Por meio do poder do senjutsu, Kabuto é capaz de usar livremente as habilidades, talentos e kekkei genkai de outros ninjas cujo material genético está integrado dentro de si mesmo. Como alternativa, ele pode canalizar suas habilidades coletivas em respectivos clones irracionais de cada shinobi. Essas cópias são geradas em de seu umbigo de cobra.",
        "games": null,
        "hand_seals": null,
        "id": 1,
        "kanji": "伝異遠影ディーエヌエー",
        "manga_panini": null,
        "name": "ADN",
        "nature": Array [],
        "portugues": "ADN; DNA; Incompatível Herança Distante das Sombras",
        "range": null,
        "rank": "Rank –",
        "romaji": "Dīenuē",
        "tv_brasileira": null,
      },
    ]
  `)
})
