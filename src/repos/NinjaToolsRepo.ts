import { Repository, EntityRepository } from 'typeorm';
import { NinjaTools } from '../entity/Ninja';

@EntityRepository(NinjaTools)
export class NinjaToolsRepo extends Repository<NinjaTools> {
	async getByNinjaID(id: number) {
		const tools = await this.createQueryBuilder('ninja_tools')
			.innerJoinAndSelect('ninja_tools.tools', 'tools')
			.where('ninjaId = :id', { id })
			.select(['tools.id as "id"', 'tools.name as "name"'])
			.getRawMany();

		return tools;
	}
}
