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
	async leader(@Root() team_parent: Team): Promise<Boolean> {
		//TODO: maybe change this resolver for return the list of all leaders in this team.
		const { leader }: { leader: Boolean } = team_parent.has_team[0];

		return leader;
	}

	@FieldResolver(() => Affiliation)
	async affiliation(@Root() team_parent: Team): Promise<Affiliation[] | undefined> {
		const team: Team | undefined = await this.teamRepo.findOne({
			relations: ['affiliation'],
			where: { id: team_parent.id }
		});

		return team?.affiliation;
	}
}
