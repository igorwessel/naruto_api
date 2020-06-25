import { Repository, EntityRepository } from 'typeorm';
import { NinjaJutsu } from '../entity/Ninja';

@EntityRepository(NinjaJutsu)
export class NinjaJutsuRepo extends Repository<NinjaJutsu> {
	async getByNinjaID(id: string) {
		const ninja_jutsus = await this.createQueryBuilder('ninja_jutsu')
			.leftJoin('ninja_jutsu.jutsu', 'jutsu')
			.leftJoin('jutsu.nature_type', 'nature_type')
			.leftJoin('jutsu.related_jutsu', 'related_jutsu')
			.leftJoin('jutsu.parent_jutsu', 'parent_jutsu')
			.leftJoin('jutsu.derived_jutsu', 'derived_jutsu')
			.addSelect('jutsu.id')
			.addSelect('jutsu.name')
			.addSelect('jutsu.literal_english_name')
			.addSelect('jutsu.english_anime_name')
			.addSelect('jutsu.description ')
			.addSelect('jutsu.range')
			.addSelect('jutsu.hand_seals')
			.addSelect('related_jutsu.name')
			.addSelect('parent_jutsu.name')
			.addSelect('derived_jutsu.name')
			.addSelect('ninja_jutsu.only ')
			.addSelect('nature_type.name ')
			.where('ninja_jutsu.ninjaId = :id', { id: parseInt(id) })
			.getMany();

		return ninja_jutsus.map(({ jutsu }) => jutsu);
	}
}
