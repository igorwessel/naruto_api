import { Classification, Jutsu, NatureType, RenamedClass } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { mock } from 'jest-mock-extended'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { Context, createMockContext, MockContext } from '~/__mocks__/prisma'

import { getJutsu, getJutsus, getNinja } from './jutsus'

let mockCtx: MockContext
let ctx: Context
let reply: jest.Mocked<FastifyReply>

const jutsus: (Jutsu & { class: RenamedClass[]; classification: Classification[]; nature_type: NatureType[] })[] = [
  {
    id: 2,
    name: 'A Herança da Vontade do Fogo',
    description:
      'Hashirama, Tobirama e Hiruzen usam uma combinação de madeira, fogo e água para empurrar o oponente. Hashirama usa sua Técnica Secreta da Liberação de Madeira: Natividade de um Mundo de Árvores para criar uma grande floresta em que Tobirama e Hiruzen atacam o oponente usando uma combinação de fogo e água. Os três Hokage então atacam o oponente, após Hashirama usar o Punho Adamantino, Tobirama chuta o oponente e Hiruzen invoca Enma que então ataca o oponente com o bastão adamantino. A força do ataque é tanta que cria uma explosão gigante na floresta no processo da conclusão da técnica.',
    kanji: '受け継がれる火の意志うけつがれるひのいし',
    romaji: 'Uketsugareru Hi no Ishi',
    portugues: 'A Herança da Vontade do Fogo',
    games: null,
    mangaPanini: null,
    tvBrasileira: null,
    range: 'Curto a Médio alcance',
    rank: null,
    handSeals: null,
    class: [{ id: 1, name: 'Ofensivo' }],
    classification: [
      { id: 1, name: 'Kekkei Genkai' },
      { id: 3, name: 'Ninjutsu' },
      { id: 4, name: 'Taijutsu' },
      { id: 5, name: 'Bukijutsu' },
    ],
    nature_type: [
      { id: 1, name: 'Liberação de Água', kekkeiGenkai: false, kekkeiTota: false },
      { id: 4, name: 'Liberação de Fogo', kekkeiGenkai: false, kekkeiTota: false },
      { id: 8, name: 'Liberação de Madeira', kekkeiGenkai: true, kekkeiTota: false },
    ],
  },
]

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  reply = mock<FastifyReply>({
    server: {
      prisma: ctx.prisma,
    },
  })
})

describe('getJutsus', () => {
  it('should get jutsus', () => {
    mockCtx.prisma.jutsu.findMany.mockResolvedValue(jutsus)

    return pipe(
      getJutsus(reply, { limit: 15, offset: 0 }),
      TE.map(jutsusResponse => expect(jutsusResponse).toStrictEqual(jutsus))
    )()
  })
})

describe('getJutsu', () => {
  it('should return a error when not found jutsu', () => {
    mockCtx.prisma.jutsu.findFirst.mockRejectedValue(new Error('null'))

    return pipe(
      getJutsu(reply, '1'),
      TE.mapLeft(e => expect(e).toMatchObject({ statusCode: 404 }))
    )()
  })

  it('should get a jutsu', () => {
    mockCtx.prisma.jutsu.findFirst.mockResolvedValue(jutsus[0])

    return pipe(
      getJutsu(reply, '1'),
      TE.map(jutsu => expect(jutsu).toStrictEqual(jutsus[0]))
    )()
  })
})

describe('getNinja', () => {
  it('should get ninjas from a jutsu', () => {
    mockCtx.prisma.jutsu.findFirst.mockReturnValue({
      ninja: jest.fn().mockResolvedValue([{ a: 1 }]),
    } as never)

    return pipe(
      getNinja(reply, '1'),
      TE.map(ninjasResponse => expect(ninjasResponse).toStrictEqual([{ a: 1 }]))
    )()
  })
})
