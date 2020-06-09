import { Resolver, FieldResolver, Root, Query, Args } from 'type-graphql';
import { Jutsu } from '../entity/Jutsu';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { JutsuRepo } from '../repos/JutsuRepo';
import { NatureTypeRepo } from '../repos/NatureTypeRepo';
import { ClassificationJutsu } from '../entity/ClassificationJutsu';
import { NatureType } from '../entity/NatureType';
import { Class } from '../entity/Class';
import { BaseArgs } from '../shared/BaseArgs';

@Resolver(Jutsu)
export class JutsuResolver {
	@InjectRepository(JutsuRepo)
	private readonly jutsuRepo: JutsuRepo;

	@InjectRepository(NatureTypeRepo)
	private readonly natureTypeRepo: NatureTypeRepo;

	@Query(() => [Jutsu])
	async jutsus(@Args() { startIndex, endIndex }: BaseArgs): Promise<Jutsu[]> {
		const jutsus: Jutsu[] = await this.jutsuRepo.find({
			skip: startIndex,
			take: endIndex,
			cache: true
		});

		return jutsus;
	}

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
	async class(@Root() jutsu_parent: Jutsu): Promise<Class[] | undefined> {
		const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
			relations: ['class']
		});

		return jutsu?.class;
	}

	@FieldResolver()
	async related_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu | undefined> {
		const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
			relations: ['related_jutsu']
		});

		return jutsu?.related_jutsu;
	}

	@FieldResolver()
	async derived_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu[] | undefined> {
		const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
			relations: ['derived_jutsu']
		});

		return jutsu?.derived_jutsu;
	}

	@FieldResolver()
	async parent_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu[] | undefined> {
		const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
			relations: ['parent_jutsu']
		});

		return jutsu?.parent_jutsu;
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
