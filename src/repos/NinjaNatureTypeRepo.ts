import { Repository, EntityRepository } from 'typeorm';
import { NinjaNaturetype } from '../entity/Ninja';

@EntityRepository(NinjaNaturetype)
export class NinjaNatureTypeRepo extends Repository<NinjaNaturetype> {
	async getByNinjaIDOrName(id?: number, name?: string) {
		const nature_types = await this.createQueryBuilder('ninja_naturetype')
			.innerJoin('ninja_naturetype.nature_type', 'nature_type')
			.innerJoin('ninja_naturetype.ninja', 'ninja')
			.where(`${id ? 'ninjaId = :parameter' : 'ninja.name = :parameter'}`, { parameter: id ? id : name })
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
