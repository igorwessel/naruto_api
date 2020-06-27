import { Repository, EntityRepository } from 'typeorm';
import { NinjaTeam } from '../entity/Ninja';

@EntityRepository(NinjaTeam)
export class NinjaTeamRepo extends Repository<NinjaTeam> {
	async getByNinjaID(id: number) {
		const teams = await this.createQueryBuilder('ninja_team')
			.innerJoinAndSelect('ninja_team.team', 'team')
			.where('ninjaId = :id', { id })
			.select(['team.id as "id"', 'team.name as "name"'])
			.getRawMany();

		return teams;
	}
}
