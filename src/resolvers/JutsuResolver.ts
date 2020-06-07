import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Jutsu } from '../entity/Jutsu';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { JutsuRepo } from '../repos/JutsuRepo';
import { NatureTypeRepo } from '../repos/NatureTypeRepo';
import { ClassificationJutsu } from '../entity/ClassificationJutsu';
import { NatureType } from '../entity/NatureType';

@Resolver(Jutsu)
export class JutsuResolver {
	@InjectRepository(JutsuRepo)
	private readonly jutsuRepo: JutsuRepo;

	@InjectRepository(NatureTypeRepo)
	private readonly natureTypeRepo: NatureTypeRepo;

	@FieldResolver()
	async nature_type(@Root() jutsu: Jutsu): Promise<String | undefined> {
		const nature = await this.natureTypeRepo
			.createQueryBuilder('nature_type')
			.innerJoinAndSelect('nature_type.jutsu', 'jutsu')
			.where('jutsu.nature_type = :id', { id: jutsu.id })
			.getOne();

		return nature?.name;
	}

	@FieldResolver()
	async classification(@Root() jutsu: Jutsu): Promise<ClassificationJutsu[] | undefined> {
		const classification = (
			await this.jutsuRepo.findOne({
				relations: ['classification'],
				where: { id: jutsu.id }
			})
		)?.classification;

		return classification;
	}
}
