import { Repository, EntityRepository } from 'typeorm';
import { Family } from '../entity/Family';

@EntityRepository(Family)
export class FamilyRepo extends Repository<Family> {
	async getByNinjaID(id: number) {
		const family = await this.createQueryBuilder('family')
			.innerJoinAndSelect('family.parent_to', 'parent_to')
			.where('parentFromId = :id', { id })
			.select(['parent_to.id as "id"', 'family.relationship as "relationship"', 'parent_to.name as "name"'])
			.getRawMany();

		return family;
	}
}
