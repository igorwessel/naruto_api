import { Resolver, FieldResolver, Root, Query, Args, Ctx } from 'type-graphql';
import { Team } from '../entity/Team';
import { Affiliation } from '../entity/Affiliation';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TeamRepo } from '../repos/TeamRepo';
import { PaginationArgs } from '../shared/PaginationArgs';
import { IGraphQLContext } from '../types/graphql';
import { Ninja } from '../entity/Ninja';

@Resolver(Team)
export class TeamResolver {
	@InjectRepository(TeamRepo)
	private readonly teamRepo: TeamRepo;

	@Query(() => [Team])
	async teams(@Args() { startIndex, endIndex }: PaginationArgs): Promise<Team[]> {
		const teams: Team[] = await this.teamRepo.find({
			skip: startIndex,
			take: endIndex,
			cache: true
		});

		return teams;
	}

	@FieldResolver()
	async members(
		@Root() team_parent: Team,
		@Ctx() { loaders: { teamMembersLoader } }: IGraphQLContext
	): Promise<Ninja[]> {
		const members = await teamMembersLoader.load(team_parent.id);

		return members;
	}

	@FieldResolver()
	async leaders(
		@Root() team_parent: Team,
		@Ctx() { loaders: { teamLeadersLoader } }: IGraphQLContext
	): Promise<Ninja[]> {
		const leaders = await teamLeadersLoader.load(team_parent.id);

		return leaders;
	}

	@FieldResolver({ nullable: true })
	async affiliation(
		@Root() team_parent: Team,
		@Ctx() { loaders: { teamAffiliationLoader } }: IGraphQLContext
	): Promise<Affiliation[]> {
		const affiliations = await teamAffiliationLoader.load(team_parent.id);

		return affiliations;
	}
}
