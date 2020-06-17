import { Resolver, FieldResolver, Root, Query, Args, Ctx } from 'type-graphql';
import { Jutsu } from '../entity/Jutsu';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { JutsuRepo } from '../repos/JutsuRepo';
import { NatureTypeRepo } from '../repos/NatureTypeRepo';
import { ClassificationJutsu } from '../entity/ClassificationJutsu';
import { NatureType } from '../entity/NatureType';
import { Class } from '../entity/Class';
import { PaginationArgs } from '../shared/PaginationArgs';
import { IGraphQLContext } from '../types/graphql';

@Resolver(Jutsu)
export class JutsuResolver {
	@InjectRepository(JutsuRepo)
	private readonly jutsuRepo: JutsuRepo;

	@Query(() => [Jutsu])
	async jutsus(@Args() { startIndex, endIndex }: PaginationArgs): Promise<Jutsu[]> {
		const jutsus: Jutsu[] = await this.jutsuRepo.find({
			skip: startIndex,
			take: endIndex,
			cache: true
		});

		return jutsus;
	}

	@FieldResolver()
	async nature(
		@Root() jutsu: Jutsu,
		@Ctx() { loaders: { jutsuNatureTypeLoader } }: IGraphQLContext
	): Promise<NatureType | undefined> {
		const nature_type: NatureType = await jutsuNatureTypeLoader.load(jutsu.id);

		return nature_type;
	}

	@FieldResolver()
	async class(
		@Root() jutsu_parent: Jutsu,
		@Ctx() { loaders: { jutsuClassLoader } }: IGraphQLContext
	): Promise<Class[]> {
		const jutsu_class: Class[] = await jutsuClassLoader.load(jutsu_parent.id);
		return jutsu_class;
	}

	@FieldResolver()
	async related_jutsu(
		@Root() jutsu_parent: Jutsu,
		@Ctx() { loaders: { jutsuRelatedLoader } }: IGraphQLContext
	): Promise<Jutsu | undefined> {
		const jutsu: Jutsu = await jutsuRelatedLoader.load(jutsu_parent.id);
		return jutsu;
	}

	// @FieldResolver()
	// async derived_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu[] | undefined> {
	// 	const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
	// 		relations: ['derived_jutsu']
	// 	});

	// 	return jutsu?.derived_jutsu;
	// }

	// @FieldResolver()
	// async parent_jutsu(@Root() jutsu_parent: Jutsu): Promise<Jutsu[] | undefined> {
	// 	const jutsu: Jutsu | undefined = await this.jutsuRepo.findOne(jutsu_parent.id, {
	// 		relations: ['parent_jutsu']
	// 	});

	// 	return jutsu?.parent_jutsu;
	// }

	// @FieldResolver()
	// async classification(@Root() jutsu: Jutsu): Promise<ClassificationJutsu[] | undefined> {
	// 	const classification: ClassificationJutsu[] | undefined = (
	// 		await this.jutsuRepo.findOne({
	// 			relations: ['classification'],
	// 			where: { id: jutsu.id }
	// 		})
	// 	)?.classification;

	// 	return classification;
	// }
}
