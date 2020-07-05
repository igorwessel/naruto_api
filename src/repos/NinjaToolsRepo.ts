import { Repository, EntityRepository } from 'typeorm';
import { NinjaTools } from '../entity/Ninja';

@EntityRepository(NinjaTools)
export class NinjaToolsRepo extends Repository<NinjaTools> {
	async getByNinjaIDOrName(id?: number, name?: string) {
		const tools = await this.createQueryBuilder('ninja_tools')
			.innerJoin('ninja_tools.tools', 'tools')
			.innerJoin('ninja_tools.ninja', 'ninja')
			.where(`${id ? 'ninjaId = :parameter' : 'ninja.name = :parameter'}`, { parameter: id ? id : name })
			.select(['tools.id as "id"', 'tools.name as "name"'])
			.getRawMany();

		return tools;
	}
}
