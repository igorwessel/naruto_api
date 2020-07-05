import { Repository, EntityRepository } from 'typeorm';
import { NinjaTeam } from '../entity/Ninja';

@EntityRepository(NinjaTeam)
export class NinjaTeamRepo extends Repository<NinjaTeam> {
	async getByNinjaIDOrName(id?: number, name?: string) {
		const teams = await this.createQueryBuilder('ninja_team')
			.innerJoin('ninja_team.team', 'team')
			.innerJoin('ninja_team.ninja', 'ninja')
			.where(`${id ? 'ninjaId = :parameter' : 'ninja.name = :parameter'}`, { parameter: id ? id : name })
			.select(['team.id as "id"', 'team.name as "name"'])
			.getRawMany();

		return teams;
	}
}
