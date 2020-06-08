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
	async nature(@Root() jutsu: Jutsu): Promise<NatureType | undefined> {
		const nature_type: NatureType | undefined = await this.natureTypeRepo
			.createQueryBuilder()
			.innerJoinAndSelect('jutsu', 'jutsu')
			.where('jutsu.id = :id', { id: jutsu.id })
			.getOne();

		return nature_type;
	}

	@FieldResolver()
	async related_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu | undefined> {
		const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
			relations: ['related_jutsu']
		});

		return jutsu?.related_jutsu;
	}

	@FieldResolver()
	async classification(@Root() jutsu: Jutsu): Promise<ClassificationJutsu[] | undefined> {
		const classification: ClassificationJutsu[] | undefined = (
			await this.jutsuRepo.findOne({
				relations: ['classification'],
				where: { id: jutsu.id }
			})
		)?.classification;

		return classification;
	}
}
