import { Repository, EntityRepository } from 'typeorm';
import { NinjaNaturetype } from '../entity/Ninja';

@EntityRepository(NinjaNaturetype)
export class NinjaNatureTypeRepo extends Repository<NinjaNaturetype> {
	async getByNinjaID(id: number) {
		const nature_types = await this.createQueryBuilder('ninja_naturetype')
			.innerJoin('ninja_naturetype.nature_type', 'nature_type')
			.where('ninjaId = :id', { id })
			.select([
				'nature_type.id as "id"',
				'nature_type.name as "name"',
				'nature_type.kekkei_genkai as "kekkei_genkai"',
				'nature_type.kekkei_tota as "kekkei_tota"',
				'ninja_naturetype.affinity as "affinity"',
				'ninja_naturetype.only as "only"'
			])
			.getRawMany();

		return nature_types.map(nature_type => ({
			...nature_type,
			affinity: nature_type.affinity !== 0 ? true : false,
			kekkei_genkai: nature_type.kekkei_genkai !== 0 ? true : false,
			kekkei_tota: nature_type.kekkei_tota !== 0 ? true : false
		}));
	}
}
