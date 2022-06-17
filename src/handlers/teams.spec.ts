import { Team } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { mock } from 'jest-mock-extended'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { Context, createMockContext, MockContext } from '~/__mocks__/prisma'

import { getTeam, getTeams, getNinja } from './teams'

let mockCtx: MockContext
let ctx: Context
let reply: jest.Mocked<FastifyReply>

const teams: Team[] = [
  {
    id: 1,
    name: '11 de Konoha',
    description:
      'Os 11 de Konoha (木ノ葉の11人, Konoha no Jūichinin, TV Brasileira: 11 da Folha) é o apelido coletivo de quatro times de Genin de Konoha, liderados por Kakashi Hatake, Asuma Sarutobi, Kurenai Yūhi e Might Guy respectivamente, com exceção de Sasuke Uchiha.',
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

describe('getTeams', () => {
  it('should get tools', () => {
    mockCtx.prisma.team.findMany.mockResolvedValue(teams)

    return pipe(
      getTeams(reply, { limit: 15, offset: 0 }),
      TE.map(teamsResponse => expect(teamsResponse).toStrictEqual(teams))
    )()
  })
})

describe('getTeam', () => {
  it('should return a error when not found team', () => {
    mockCtx.prisma.team.findFirst.mockRejectedValue(new Error('null'))

    return pipe(
      getTeam(reply, '1'),
      TE.mapLeft(e => expect(e).toMatchObject({ statusCode: 404 }))
    )()
  })

  it('should get a tool', () => {
    mockCtx.prisma.team.findFirst.mockResolvedValue(teams[0])

    return pipe(
      getTeam(reply, '1'),
      TE.map(team => expect(team).toStrictEqual(teams[0]))
    )()
  })
})

describe('getNinja', () => {
  it('should get ninjas from a team', () => {
    mockCtx.prisma.team.findFirst.mockReturnValue({
      ninja: jest.fn().mockResolvedValue([{ a: 1 }]),
    } as never)

    return pipe(
      getNinja(reply, '1'),
      TE.map(ninjasResponse => expect(ninjasResponse).toStrictEqual([{ a: 1 }]))
    )()
  })
})
