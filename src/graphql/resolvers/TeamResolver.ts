import { Resolver, FieldResolver, Root, Query, Args, Ctx } from 'type-graphql';
import { Team } from '../../entity/Team';
import { Affiliation } from '../../entity/Affiliation';
import { PaginationArgs } from '../types/PaginationArgs';
import { IGraphQLContext } from '../types/Context';
import { Ninja } from '../../entity/Ninja';

@Resolver(Team)
export class TeamResolver {
	@Query(() => [Team])
	async teams(@Args() { startIndex, endIndex }: PaginationArgs, @Ctx() { prisma }: IGraphQLContext) {
		const teams = await prisma.team.findMany({
			skip: startIndex,
			take: endIndex
		});

		return teams;
	}

	@FieldResolver()
	async members(@Root() team: Team, @Ctx() { prisma }: IGraphQLContext) {
		const members = await prisma.team.findUnique({ where: { id: team.id || undefined } }).ninja();

		return members;
	}

	@FieldResolver({ nullable: true })
	async affiliation(@Root() team: Team, @Ctx() { prisma }: IGraphQLContext) {
		const affiliations = await prisma.team.findUnique({ where: { id: team.id || undefined } }).affiliation();
		return affiliations;
	}
}
