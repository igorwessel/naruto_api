import { Tools } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { mock } from 'jest-mock-extended'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { Context, createMockContext, MockContext } from '~/__mocks__/prisma'

import { getNinja, getTool, getTools } from './tools'

let mockCtx: MockContext
let ctx: Context
let reply: jest.Mocked<FastifyReply>

const tools: Tools[] = [
  {
    id: 1,
    name: 'A Lenda de Um Ninja Determinado',
    description:
      "A Lenda de Um Ninja Determinado foi o primeiro livro de Jiraiya, escrito ao treinar os órfãos de Ame. A história segue as aventuras de um ninja chamado Naruto, nomeado por Jiraiya enquanto ele comia ramen. O personagem principal, Naruto, nunca desiste e promete quebrar a 'maldição' que foi mencionado na história. A 'maldição' mencionada representa os 'ciclos viciosos' de guerra, conflito e ódio, que ocupa o mundo ninja que Nagato uma vez falou sobre com Jiraiya.",
    kanji: 'ド根性忍伝',
    romaji: 'Dokonjō Ninden',
    portugues: null,
    games: null,
    mangaPanini: null,
    tvBrasileira: null,
  },
  {
    id: 2,
    name: 'Adaga',
    description: null,
    kanji: null,
    romaji: null,
    portugues: null,
    games: null,
    mangaPanini: null,
    tvBrasileira: null,
  },
]

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = (mockCtx as unknown) as Context
  reply = mock<FastifyReply>({
    server: {
      prisma: ctx.prisma,
    },
  })
})

describe('getTools', () => {
  it('should get tools', () => {
    mockCtx.prisma.tools.findMany.mockResolvedValue(tools)

    return pipe(
      getTools(reply, { limit: 15, offset: 0 }),
      TE.map(toolsResponse => expect(toolsResponse).toStrictEqual(tools))
    )()
  })
})

describe('getTool', () => {
  it('should return a error when not found tool', () => {
    mockCtx.prisma.tools.findFirst.mockRejectedValue(new Error('null'))

    return pipe(
      getTool(reply, '1'),
      TE.mapLeft(e => expect(e).toMatchObject({ statusCode: 404 }))
    )()
  })

  it('should get a tool', () => {
    mockCtx.prisma.tools.findFirst.mockResolvedValue(tools[0])

    return pipe(
      getTool(reply, '1'),
      TE.map(tool => expect(tool).toStrictEqual(tools[0]))
    )()
  })
})

describe('getNinjas', () => {
  it('should get ninjas from a tool', () => {
    mockCtx.prisma.tools.findFirst.mockReturnValue({
      ninjas: jest.fn().mockResolvedValue([{ a: 1 }]),
    } as never)

    return pipe(
      getNinja(reply, '1'),
      TE.map(ninjasResponse => expect(ninjasResponse).toStrictEqual([{ a: 1 }]))
    )()
  })
})
