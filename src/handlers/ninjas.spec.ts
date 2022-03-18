import { Affiliation, Clan, Classification, Ninja, Occupation } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { mock } from 'jest-mock-extended'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { Context, createMockContext, MockContext } from '~/__mocks__/prisma'
import { getUniqueNinja, getNinjas, getNinjaFamily, getNinjaTools, getNinjaAttributes } from './ninjas'

type NinjaWithRelations = Ninja & {
  occupation: Occupation[]
  affiliation: Affiliation[]
  clan: Clan[]
  classification: Classification[]
}

let mockCtx: MockContext
let ctx: Context
let reply: jest.Mocked<FastifyReply>

const idParam = '802'
const nameParam = 'naruto-uzumaki'

const ninjaMock: NinjaWithRelations = {
  id: 802,
  name: 'Naruto Uzumaki',
  birthdate: '10 de outubro',
  specie: 'Humano',
  status: 'Incapacitado Boruto',
  sex: 'Masculino',
  bloodType: 'B',
  ninjaRegistration: '012607',
  academyGradAge: '12',
  chuninPromAge: null,
  occupation: [{ id: 122, name: 'Hokage' }],
  affiliation: [
    { id: 2, name: 'Forcas Aliadas Shinobi' },
    { id: 9, name: 'Konohagakure' },
    { id: 53, name: 'Monte Myoboku' },
  ],
  clan: [{ id: 7, name: 'Cla Uzumaki' }],
  classification: [
    { id: 6, name: 'Tipo Sensor' },
    { id: 11, name: 'Jinchuriki' },
    { id: 20, name: 'Sabio' },
  ],
}

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = (mockCtx as unknown) as Context
  reply = mock<FastifyReply>({
    server: {
      prisma: ctx.prisma,
    },
  })
})

describe('getUniqueNinja', () => {
  it('should get a ninja by id', () => {
    mockCtx.prisma.ninja.findFirst.mockResolvedValue(ninjaMock)

    const ninja = getUniqueNinja(reply, idParam)

    return pipe(
      ninja,
      TE.map(ninja => expect(ninja).toStrictEqual(ninjaMock))
    )()
  })

  it('should get a ninja by name', () => {
    mockCtx.prisma.ninja.findFirst.mockResolvedValue(ninjaMock)

    const ninja = getUniqueNinja(reply, nameParam)

    return pipe(
      ninja,
      TE.map(ninja => expect(ninja).toStrictEqual(ninjaMock))
    )()
  })

  it('should return a 404 error when not found', () => {
    mockCtx.prisma.ninja.findFirst.mockRejectedValue(new Error('s'))

    const ninja = getUniqueNinja(reply, '1')

    return pipe(
      ninja,
      TE.mapLeft(error =>
        expect(error).toMatchObject({ statusCode: 404, error: expect.any(String), message: expect.any(String) })
      )
    )()
  })
})

describe('getNinjas', () => {
  it('should get array of ninjas', () => {
    const ninjasMock: NinjaWithRelations & {
      familyParentToIdToNinja: { id: number; relationship: string; parentFrom: { name: string } }[]
      ninjaAttr: {
        id: number
        age: string
        height: string
        weight: string
        ninjaRank: string
        season: { name: string }
      }[]
    } = {
      ...ninjaMock,
      familyParentToIdToNinja: [
        {
          id: 52,
          relationship: 'Pai',
          parentFrom: {
            name: 'Boruto Uzumaki',
          },
        },
      ],
      ninjaAttr: [
        {
          id: 349,
          age: '12-13 anos',
          height: '40.1 - 40.6 kg',
          weight: '145.3 cm - 147.5 cm',
          ninjaRank: 'Genin',
          season: {
            name: 'Parte I',
          },
        },
      ],
    }

    const response = {
      academyGradAge: '12',
      affiliation: [
        {
          id: 2,
          name: 'Forcas Aliadas Shinobi',
        },
        {
          id: 9,
          name: 'Konohagakure',
        },
        {
          id: 53,
          name: 'Monte Myoboku',
        },
      ],
      attributes: [
        {
          age: '12-13 anos',
          height: '40.1 - 40.6 kg',
          id: 349,
          ninjaRank: 'Genin',
          season: {
            name: 'Parte I',
          },
          weight: '145.3 cm - 147.5 cm',
        },
      ],
      birthdate: '10 de outubro',
      bloodType: 'B',
      chuninPromAge: null,
      clan: [
        {
          id: 7,
          name: 'Cla Uzumaki',
        },
      ],
      classification: [
        {
          id: 6,
          name: 'Tipo Sensor',
        },
        {
          id: 11,
          name: 'Jinchuriki',
        },
        {
          id: 20,
          name: 'Sabio',
        },
      ],
      family: [
        {
          id: 52,
          parentFrom: {
            name: 'Boruto Uzumaki',
          },
          relationship: 'Pai',
        },
      ],
      id: 802,
      name: 'Naruto Uzumaki',
      ninjaRegistration: '012607',
      occupation: [
        {
          id: 122,
          name: 'Hokage',
        },
      ],
      sex: 'Masculino',
      specie: 'Humano',
      status: 'Incapacitado Boruto',
    }

    mockCtx.prisma.ninja.findMany.mockResolvedValue([ninjasMock])

    const ninjas = getNinjas(reply, { limit: 15, offset: 0 })

    return pipe(
      ninjas,
      TE.map(ninjas => expect(ninjas).toStrictEqual([response]))
    )()
  })
})

describe('getNinjaTools', () => {
  it('should return 404 error when tools not found', () => {
    const tools = jest.fn().mockResolvedValue([])

    mockCtx.prisma.ninja.findFirst.mockReturnValue({
      tools,
    } as never)

    const toolsResult = getNinjaTools(reply, '1')

    return pipe(
      toolsResult,
      TE.mapLeft(err => expect(err).toMatchObject({ statusCode: 404 }))
    )()
  })

  it('should get tools from a ninja', () => {
    const tools = jest.fn().mockResolvedValue([
      {
        id: 41,
        name: 'Canhão de Chakra',
        description:
          'Canhões de Chakra foram um conjunto de armas de longo alcance especializadas que disparavam feixes de chakra. Essa arma é carregada com chakra de grupos de shinobi. Estes equipamentos foram utilizados para destruir a Lua, a qual estava caindo em direção à Terra por causa de Toneri Ōtsutsuki. Essa foi uma arma ocultada pelo Quarto Raikage, após a Quarta Guerra Mundial Ninja. Por questões de disparo, o equipamento consistia de três bocais (canos).',
        kanji: null,
        romaji: null,
        portugues: null,
        games: null,
        mangaPanini: null,
        tvBrasileira: null,
      },
    ])

    mockCtx.prisma.ninja.findFirst.mockReturnValue({
      tools,
    } as never)

    const toolsResult = getNinjaTools(reply, '1')

    return pipe(
      toolsResult,
      TE.map(family =>
        expect(family).toStrictEqual([
          {
            id: 41,
            name: 'Canhão de Chakra',
            description:
              'Canhões de Chakra foram um conjunto de armas de longo alcance especializadas que disparavam feixes de chakra. Essa arma é carregada com chakra de grupos de shinobi. Estes equipamentos foram utilizados para destruir a Lua, a qual estava caindo em direção à Terra por causa de Toneri Ōtsutsuki. Essa foi uma arma ocultada pelo Quarto Raikage, após a Quarta Guerra Mundial Ninja. Por questões de disparo, o equipamento consistia de três bocais (canos).',
            kanji: null,
            romaji: null,
            portugues: null,
            games: null,
            mangaPanini: null,
            tvBrasileira: null,
          },
        ])
      )
    )()
  })
})

describe('getNinjaFamily', () => {
  it('should return 404 error when family not found', () => {
    const familyParentToIdToNinja = jest.fn().mockResolvedValue([])

    mockCtx.prisma.ninja.findFirst.mockReturnValue({
      familyParentToIdToNinja,
    } as never)

    const family = getNinjaFamily(reply, '1')

    return pipe(
      family,
      TE.mapLeft(err => expect(err).toMatchObject({ statusCode: 404 }))
    )()
  })

  it('should get family from a ninja', () => {
    const familyParentToIdToNinja = jest
      .fn()
      .mockResolvedValue([{ id: 1, relationship: 'Pai', parentFrom: { name: 'A (Quarto Raikage)' } }])

    mockCtx.prisma.ninja.findFirst.mockReturnValue({
      familyParentToIdToNinja,
    } as never)

    const family = getNinjaFamily(reply, '1')

    return pipe(
      family,
      TE.map(family =>
        expect(family).toStrictEqual([{ id: 1, relationship: 'Pai', parentFrom: { name: 'A (Quarto Raikage)' } }])
      )
    )()
  })
})

describe('getNinjaAttributes', () => {
  it('should get attributes from a ninja', () => {
    const attributes = [
      { id: 3, age: '47 anos', height: '101.1 kg', weight: '198.2 cm', ninjaRank: null, season: { name: 'Parte II' } },
      { id: 4, age: '62-63 anos', height: null, weight: null, ninjaRank: null, season: { name: 'Periodo em Branco' } },
    ]

    const ninjaAttr = jest.fn().mockResolvedValue(attributes)

    mockCtx.prisma.ninja.findFirst.mockReturnValue({ ninjaAttr } as never)

    const attributesResponse = getNinjaAttributes(reply, '1')

    return pipe(
      attributesResponse,
      TE.map(attributesResponse => expect(attributesResponse).toStrictEqual(attributes))
    )()
  })

  it('should return 404 error when attributes not found', () => {
    const ninjaAttr = jest.fn().mockResolvedValue([])

    mockCtx.prisma.ninja.findFirst.mockReturnValue({ ninjaAttr } as never)

    const attributesResponse = getNinjaAttributes(reply, '1')

    return pipe(
      attributesResponse,
      TE.mapLeft(e => expect(e).toMatchObject({ statusCode: 404 }))
    )()
  })
})
