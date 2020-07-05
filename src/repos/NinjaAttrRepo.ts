import { Repository, EntityRepository } from 'typeorm';
import { NinjaAttr } from '../entity/Ninja';

@EntityRepository(NinjaAttr)
export class NinjaAttrRepo extends Repository<NinjaAttr> {
	async getByNinjaID(id: number) {
		const attributes = await this.createQueryBuilder('ninja_attributes')
			.select('ninja_attributes.id', 'id')
			.leftJoin('ninja_attributes.season', 'season')
			.addSelect('season.name', 'season')
			.addSelect('ninja_attributes.age', 'age')
			.addSelect('ninja_attributes.height', 'height')
			.addSelect('ninja_attributes.weight', 'weight')
			.addSelect('ninja_attributes.ninja_rank', 'ninja_rank')
			.where('ninja_attributes.ninjaId = :id', { id })
			.getRawMany();

		return attributes;
	}
}
