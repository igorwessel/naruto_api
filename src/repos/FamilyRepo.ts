import { Repository, EntityRepository } from 'typeorm';
import { Family } from '../entity/Family';

@EntityRepository(Family)
export class FamilyRepo extends Repository<Family> {
	async getByNinjaIDOrName(id?: number, name?: string) {
		const family = await this.createQueryBuilder('family')
			.innerJoin('family.parent_to', 'parent_to')
			.innerJoin('family.parent_from', 'parent_from')
			.where(`${id ? 'parentFromId = :parameter' : 'parent_from.name = :parameter'}`, { parameter: id ? id : name })
			.select(['parent_to.id as "id"', 'family.relationship as "relationship"', 'parent_to.name as "name"'])
			.getRawMany();

		return family;
	}
}
