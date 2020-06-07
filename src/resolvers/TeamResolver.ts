import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Team } from '../entity/Team';
import { Affiliation } from '../entity/Affiliation';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TeamRepo } from '../repos/TeamRepo';

@Resolver(Team)
export class TeamResolver {
	@InjectRepository(TeamRepo)
	private readonly teamRepo: TeamRepo;

	@FieldResolver(() => Affiliation)
	async affiliation(@Root() team: Team) {
		const affiliation = await this.teamRepo.find({
			relations: ['affiliation'],
			where: { id: team.id }
		});

		return affiliation[0].affiliation;
	}
}
