import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Team } from '../entity/Team';
import { Affiliation } from '../entity/Affiliation';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TeamRepo } from '../repos/TeamRepo';

@Resolver(Team)
export class TeamResolver {
	@InjectRepository(TeamRepo)
	private readonly teamRepo: TeamRepo;

	@FieldResolver()
	async leader(@Root() team: Team): Promise<Boolean> {
		//TODO: maybe change this resolver for return the list of all leaders in this team.
		const { leader } = team.has_team[0];

		return leader;
	}

	@FieldResolver(() => Affiliation)
	async affiliation(@Root() team: Team): Promise<Affiliation[]> {
		const affiliation = await this.teamRepo.find({
			relations: ['affiliation'],
			where: { id: team.id }
		});

		return affiliation[0].affiliation;
	}
}
