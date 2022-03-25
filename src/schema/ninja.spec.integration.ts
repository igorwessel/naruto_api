import { createMercuriusTestClient } from 'mercurius-integration-testing'

import build from '~/app'
import { ninjaDepthLimitError, ninjasQuery } from '~/__fixtures__/graphql'

const client = createMercuriusTestClient(build({ logger: false }))

it('should get ninjas', async () => {
  const { data } = await client.query(ninjasQuery, { variables: { limit: 1, offset: 0 } })

  expect(data.ninjas).toMatchInlineSnapshot(`
    Array [
      Object {
        "academy_grad_age": null,
        "affiliation": Array [
          Object {
            "id": 1,
            "name": "Kumogakure",
          },
        ],
        "birthdate": "1 de Dezembro",
        "blood_type": null,
        "chunin_prom_age": null,
        "clan": Array [],
        "classification": Array [
          Object {
            "id": 1,
            "name": "Kage",
          },
        ],
        "family": Array [],
        "id": 1,
        "jutsus": Array [
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
              Object {
                "id": 3,
                "name": "Defensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 3,
                "name": "Ninjutsu",
              },
              Object {
                "id": 16,
                "name": "Ninjutsu Espaco-Tempo",
              },
            ],
            "description": "A Técnica de Invocação é um ninjutsu de espaço-tempo que permite que o invocador transporte animais ou pessoas através de longas distâncias instantaneamente através do sangue do usuário.",
            "games": null,
            "hand_seals": null,
            "id": 2385,
            "kanji": "口寄せの術",
            "manga_panini": null,
            "name": "Técnica de Invocação",
            "nature": Array [],
            "portugues": "Técnica de Invocação",
            "range": null,
            "rank": "Rank C",
            "romaji": "Kuchiyose no Jutsu",
            "tv_brasileira": null,
          },
        ],
        "name": "A (Primeiro Raikage)",
        "nature_type": Array [],
        "ninja_attributes": Array [
          Object {
            "age": null,
            "height": "97.2 kg",
            "ninja_rank": null,
            "season": Object {
              "id": 1,
              "name": "Parte I",
            },
            "weight": "210.1 cm",
          },
          Object {
            "age": null,
            "height": "97.2 kg",
            "ninja_rank": null,
            "season": Object {
              "id": 2,
              "name": "Parte II",
            },
            "weight": "210.1 cm",
          },
        ],
        "ninja_registration": null,
        "occupation": Array [
          Object {
            "id": 1,
            "name": "Raikage",
          },
        ],
        "sex": "Masculino",
        "specie": "Humano",
        "status": "Morto",
        "team": Array [],
        "tools": Array [],
      },
    ]
  `)
})

it('should get only 2 ninjas', async () => {
  const { data } = await client.query(ninjasQuery, { variables: { limit: 2, offset: 0 } })

  expect(data.ninjas).toHaveLength(2)
})

it('should get ninjas after a id 1', async () => {
  const { data } = await client.query(ninjasQuery, { variables: { limit: 1, offset: 1 } })

  expect(data.ninjas).toMatchInlineSnapshot(`
    Array [
      Object {
        "academy_grad_age": null,
        "affiliation": Array [
          Object {
            "id": 1,
            "name": "Kumogakure",
          },
          Object {
            "id": 2,
            "name": "Forcas Aliadas Shinobi",
          },
        ],
        "birthdate": "1 de Junho",
        "blood_type": null,
        "chunin_prom_age": null,
        "clan": Array [],
        "classification": Array [],
        "family": Array [
          Object {
            "details": Object {
              "id": 4,
              "name": "A (Terceiro Raikage)",
            },
            "relationship": "Filho",
          },
          Object {
            "details": Object {
              "id": 84,
              "name": "Blue B",
            },
            "relationship": "Primo",
          },
          Object {
            "details": Object {
              "id": 560,
              "name": "Killer B",
            },
            "relationship": "Irmão Adotivo",
          },
        ],
        "id": 2,
        "jutsus": Array [
          Object {
            "class": Array [
              Object {
                "id": 2,
                "name": "Suplementar",
              },
              Object {
                "id": 3,
                "name": "Defensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 3,
                "name": "Ninjutsu",
              },
              Object {
                "id": 23,
                "name": "Fluxo de Chakra",
              },
            ],
            "description": "O Modo de Chakra de Liberação de Relâmpago é um estado elevado do Quarto e Terceiro Raikage.",
            "games": "Armadura Relâmpago[2]",
            "hand_seals": null,
            "id": 1619,
            "kanji": "雷遁チャクラモードらいとんチャクラモード",
            "manga_panini": null,
            "name": "Modo de Chakra de Liberação de Relâmpago",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Modo de Chakra de Liberação de Relâmpago",
            "range": null,
            "rank": "Rank B",
            "romaji": "Raiton Chakura Mōdo",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 3,
                "name": "Ninjutsu",
              },
              Object {
                "id": 14,
                "name": "Konbijutsu",
              },
              Object {
                "id": 27,
                "name": "Yugojutsu",
              },
            ],
            "description": "Mei Terumī expele água em forma de um dragão e é assistida por A que adiciona sua Liberação de Relâmpago para o dragão de água. A técnica é capaz de entorpecer o alvo para restringir seus movimentos.",
            "games": null,
            "hand_seals": null,
            "id": 1852,
            "kanji": "雷水龍弾らいすいりゅうだん",
            "manga_panini": null,
            "name": "Projétil do Dragão de Água e Relâmpago",
            "nature": Array [
              Object {
                "id": 1,
                "name": "Liberação de Água",
              },
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Projétil do Dragão de Água e Relâmpago",
            "range": "Longo alcance",
            "rank": null,
            "romaji": "Raisuiryūdan",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Depois de cobrir-se em seu Modo de Chakra de Liberação de Relâmpago, A salta no ar acima de seu oponente e executa um chute baixo, usando o impulso da queda para aumentar o poder por trás do ataque.",
            "games": "Conduzir",
            "hand_seals": null,
            "id": 1902,
            "kanji": "義雷沈怒雷斧",
            "manga_panini": null,
            "name": "Queda da Guilhotina",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Relâmpago Íntegro Afundando a Raiva do Machado Relâmpago",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Girochin Doroppu",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Enquanto coberto no Modo de Chakra de Liberação de Relâmpago, o usuário corre em direção ao oponente e o soca em sua velocidade máxima.",
            "games": "Relâmpago Reto",
            "hand_seals": null,
            "id": 1953,
            "kanji": "雷斗忍遇須吐励刀",
            "manga_panini": null,
            "name": "Relâmpago Reto",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Luta Relâmpago Suportando Encontro Obrigatório de Ejeção Incentivando Espada",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Raitoningu Sutorēto",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 4,
                "name": "Taijutsu",
              },
            ],
            "description": "Consiste em desferir um golpe usando o cotovelo no oponente. O golpe ainda pode causar maiores danos se o outro braço for usado como apoio para aplicar mais força.",
            "games": "Corte Infernal[1]",
            "hand_seals": null,
            "id": 2111,
            "kanji": "斬獄手刀",
            "manga_panini": null,
            "name": "Talhada de Corte Aprisionador",
            "nature": Array [],
            "portugues": "Talhada de Corte Aprisionador",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Zangoku Shutō",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 2,
                "name": "Suplementar",
              },
            ],
            "classification": Array [
              Object {
                "id": 3,
                "name": "Ninjutsu",
              },
            ],
            "description": "A Técnica de Cintilação Corporal é uma técnica de movimento em alta velocidade, permitindo que um ninja mova-se de uma curta para uma longa distância a uma velocidade quase indetectável. Para um observador, ele aparece como se o usuário tivesse teletransportado. Uma baforada de fumaça é ocasionalmente usada para disfarçar os movimentos do usuário. Ela é realizada usando chakra para vitalizar temporariamente o corpo e se mover em velocidades extremas. A quantidade de chakra necessária depende da distância total e elevação entre o usuário e o destinatário.",
            "games": null,
            "hand_seals": null,
            "id": 2325,
            "kanji": "瞬身の術",
            "manga_panini": null,
            "name": "Técnica de Cintilação Corporal",
            "nature": Array [],
            "portugues": "Técnica de Cintilação Corporal",
            "range": null,
            "rank": "Rank D",
            "romaji": "Shunshin no Jutsu",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Depois de cobrir-se em seu Modo de Chakra de Liberação de Relâmpago, o Quarto Raikage agarra o seu oponente e levanta-lhe no ar. Em seguida, usando sua força extrema, ele esmaga-o de cabeça para o chão em que se assemelha a uma manobra powerbomb. Isso é devastador o suficiente para quebrar uma grande área do próprio solo com o impacto. Darui observou que ninguém jamais sobreviveu a isso antes, e se Sasuke não tivesse usado seu Susanoo, ele teria sido morto. O impacto desta técnica foi forte o suficiente para rachar as costelas do Susanoo de Sasuke.",
            "games": null,
            "hand_seals": null,
            "id": 262,
            "kanji": "雷我爆弾",
            "manga_panini": null,
            "name": "Bomba Liger",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Bomba Auto-Relâmpago",
            "range": "Curto alcance",
            "rank": "Rank B",
            "romaji": "Raigā Bomu",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Enquanto coberto no Modo de Chakra de Liberação de Relâmpago, A executa um golpe horizontal contra seu adversário de cima, usando da queda anterior para impulsionar o golpe.",
            "games": null,
            "hand_seals": null,
            "id": 452,
            "kanji": "雷虐水平千代舞らいぎゃくすいへいチョップ",
            "manga_panini": null,
            "name": "Corte Horizontal de Relâmpago Violento",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Corte Horizontal de Relâmpago Violento",
            "range": "Curto alcance",
            "rank": "Rank C",
            "romaji": "Raigyaku Suihei Choppu",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Depois de cobrir-se com seu Modo de Chakra de Liberação de Relâmpago, A empurra o oponente com seu cotovelo com uma força extrema. Esta técnica foi forte o suficiente para fazer Jūgo bater em uma parede, impossibilitando-o de continuar lutando.",
            "games": null,
            "hand_seals": null,
            "id": 474,
            "kanji": "重流暴",
            "manga_panini": null,
            "name": "Cotovelada",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Explosão do Estilo-Pesado",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Erubō",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 4,
                "name": "Taijutsu",
              },
            ],
            "description": "Este movimento implica simplesmente em apertar o rosto do alvo com a mão. A usa essa técnica quando precisa punir Killer B. Gyūki tem visto A fazer isso em B várias vezes ao ponto que o mesmo menciona que A daria a garra de ferro em B se ele ajudasse Naruto na fuga de Genbu.",
            "games": null,
            "hand_seals": null,
            "id": 829,
            "kanji": "アイアンクロー",
            "manga_panini": null,
            "name": "Garra de Ferro",
            "nature": Array [],
            "portugues": "Garra de Ferro",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Aian Kurō",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 12,
                "name": "Nintaijutsu",
              },
            ],
            "description": "Coberto pelo Modo de Chakra de Liberação de Relâmpago, A executa um poderoso golpe horizontal contra o adversário, de tal forma a ser poderoso o suficiente para rachar os ossos da caixa torácica do Susanoo tanto de Sasuke Uchiha como de Madara.",
            "games": null,
            "hand_seals": null,
            "id": 916,
            "kanji": "雷虐水平らいぎゃくすいへい",
            "manga_panini": null,
            "name": "Horizontal de Relâmpago Violento",
            "nature": Array [
              Object {
                "id": 2,
                "name": "Liberação de Relâmpago",
              },
            ],
            "portugues": "Horizontal de Relâmpago Violento",
            "range": "Curto alcance",
            "rank": null,
            "romaji": "Raigyaku Suihei",
            "tv_brasileira": null,
          },
          Object {
            "class": Array [
              Object {
                "id": 1,
                "name": "Ofensivo",
              },
            ],
            "classification": Array [
              Object {
                "id": 4,
                "name": "Taijutsu",
              },
            ],
            "description": "O Lariat é um famoso movimento de taijutsu usado pelo Raikage e seu parceiro.",
            "games": "Laço",
            "hand_seals": null,
            "id": 1068,
            "kanji": "雷犂熱刀ラリアット",
            "manga_panini": null,
            "name": "Lariat",
            "nature": Array [],
            "portugues": "Arado Elétrico com Lâmina Quente",
            "range": "Curto alcance",
            "rank": "Rank A",
            "romaji": "Rariatto",
            "tv_brasileira": null,
          },
        ],
        "name": "A (Quarto Raikage)",
        "nature_type": Array [
          Object {
            "id": 1,
            "kekkei_genkai": null,
            "kekkei_tota": null,
            "name": "Liberação de Água",
          },
          Object {
            "id": 2,
            "kekkei_genkai": null,
            "kekkei_tota": null,
            "name": "Liberação de Relâmpago",
          },
          Object {
            "id": 3,
            "kekkei_genkai": null,
            "kekkei_tota": null,
            "name": "Liberação de Terra",
          },
        ],
        "ninja_attributes": Array [
          Object {
            "age": "47 anos",
            "height": "101.1 kg",
            "ninja_rank": null,
            "season": Object {
              "id": 2,
              "name": "Parte II",
            },
            "weight": "198.2 cm",
          },
          Object {
            "age": "62-63 anos",
            "height": null,
            "ninja_rank": null,
            "season": Object {
              "id": 4,
              "name": "Periodo em Branco",
            },
            "weight": null,
          },
        ],
        "ninja_registration": null,
        "occupation": Array [
          Object {
            "id": 1,
            "name": "Raikage",
          },
          Object {
            "id": 2,
            "name": "Lider Supremo das Forcas Aliadas Shinobi",
          },
        ],
        "sex": "Masculino",
        "specie": "Humano",
        "status": null,
        "team": Array [
          Object {
            "affiliation": Array [
              Object {
                "id": 1,
                "name": "Kumogakure",
              },
            ],
            "description": "Lariat Bomba Liger dos Dois Pelotões (Apenas Game)",
            "id": 8,
            "members": Array [
              Object {
                "id": 2,
                "name": "A (Quarto Raikage)",
              },
              Object {
                "id": 560,
                "name": "Killer B",
              },
            ],
            "name": "Combo A–B",
          },
          Object {
            "affiliation": Array [
              Object {
                "id": 1,
                "name": "Kumogakure",
              },
            ],
            "description": "O Time de Captura do Hachibi foi um grupo de shinobi de Kumogakure, que agiu durante o governo do Terceiro Raikage, que agiam sempre quando um jinchūriki perdia o controle do Hachibi, fazendo ocorrer vários ataques. Para lidar com esses ataques, o Terceiro Raikage montou uma equipe especial encarregada de parar o Hachibi sempre que esses ataques aconteciam. Eles prendiam o Hachibi com correntes — que no anime, foram ditas serem imbuídas com um fūinjutsu — para distraí-lo, dando tempo o suficiente para o Terceiro usar o Kohaku no Jōhei para selar a besta. A incapacidade dos jinchūriki em controlar o Hachibi custava à Kumogakure muitas vidas, inclusive a do pai de Motoi, um membro da equipe. Depois do Hachibi ser selado em Killer B, ele foi capaz de controlá-lo, pondo fim aos ataques e causando o fim desta equipe.",
            "id": 143,
            "members": Array [
              Object {
                "id": 2,
                "name": "A (Quarto Raikage)",
              },
              Object {
                "id": 4,
                "name": "A (Terceiro Raikage)",
              },
              Object {
                "id": 238,
                "name": "Furui",
              },
            ],
            "name": "Time de Captura do Hachibi",
          },
        ],
        "tools": Array [
          Object {
            "description": "Os Braceletes de Ferro são um par de apêndices de ouro que ficam em volta do braço do usuário. Eles podem ser utilizados tanto como uma ferramenta de treinamento quanto como uma arma ofensiva na batalha, pois têm saliências que podem se sobressair. O da esquerda foi reduzido a cinzas pelo Amaterasu de Sasuke junto com o braço de A. Desde o início da Quarta Guerra Mundial Ninja o Raikage parou de usá-los.",
            "games": null,
            "id": 28,
            "kanji": null,
            "manga_panini": null,
            "name": "Braceletes de Ferro",
            "portugues": null,
            "romaji": null,
            "tv_brasileira": null,
          },
          Object {
            "description": "Canhões de Chakra foram um conjunto de armas de longo alcance especializadas que disparavam feixes de chakra. Essa arma é carregada com chakra de grupos de shinobi. Estes equipamentos foram utilizados para destruir a Lua, a qual estava caindo em direção à Terra por causa de Toneri Ōtsutsuki. Essa foi uma arma ocultada pelo Quarto Raikage, após a Quarta Guerra Mundial Ninja. Por questões de disparo, o equipamento consistia de três bocais (canos).",
            "games": null,
            "id": 41,
            "kanji": null,
            "manga_panini": null,
            "name": "Canhão de Chakra",
            "portugues": null,
            "romaji": null,
            "tv_brasileira": null,
          },
        ],
      },
    ]
  `)
})

it('should get depth limit error when have nested query above 10 levels', async () => {
  const { errors } = await client.query(ninjaDepthLimitError)

  expect(errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining('exceeds maximum operation depth of 10'),
      }),
    ])
  )
})
