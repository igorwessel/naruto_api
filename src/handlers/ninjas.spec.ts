import { Affiliation, Clan, Classification, Ninja, Occupation } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { mock } from 'jest-mock-extended'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { Context, createMockContext, MockContext } from '~/__mocks__/prisma'
import { getUniqueNinja, getNinjas } from './ninjas'

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
  it('should get a ninja by id', async () => {
    mockCtx.prisma.ninja.findFirst.mockResolvedValue(ninjaMock)

    const ninja = await getUniqueNinja(reply, idParam)

    return pipe(
      ninja,
      TE.map(ninja => expect(ninja).toStrictEqual(ninjaMock))
    )()
  })

  it('should get a ninja by name', async () => {
    mockCtx.prisma.ninja.findFirst.mockResolvedValue(ninjaMock)

    const ninja = await getUniqueNinja(reply, nameParam)

    return pipe(
      ninja,
      TE.map(ninja => expect(ninja).toStrictEqual(ninjaMock))
    )()
  })

  it('should return a 404 error when not found', async () => {
    mockCtx.prisma.ninja.findFirst.mockRejectedValue(null)

    const ninja = await getUniqueNinja(reply, '1')

    return pipe(
      ninja,
      TE.mapLeft(error =>
        expect(error).toStrictEqual({ statusCode: 404, error: expect.any(String), message: expect.any(String) })
      )
    )()
  })
})

describe('getNinjas', () => {
  it('should get array of ninjas', async () => {
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

    const ninjas = await getNinjas(reply, { limit: 15, offset: 0 })

    return pipe(
      ninjas,
      TE.map(ninjas => expect(ninjas).toStrictEqual([response]))
    )()
  })
})
