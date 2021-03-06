import { Resolver, FieldResolver, Root, Query, Args, Ctx } from 'type-graphql';
import { Jutsu } from '../../entity/Jutsu';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { JutsuRepo } from '../../repos/JutsuRepo';
import { ClassificationJutsu } from '../../entity/ClassificationJutsu';
import { NatureType } from '../../entity/NatureType';
import { Class } from '../../entity/Class';
import { PaginationArgs } from '../types/PaginationArgs';
import { IGraphQLContext } from '../types/Context';

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

	// @FieldResolver()
	// async related_jutsu(
	// 	@Root() jutsu_parent: Jutsu,
	// 	@Ctx() { loaders: { jutsuRelatedLoader } }: IGraphQLContext
	// ): Promise<Jutsu | undefined> {
	// 	const related_jutsu: Jutsu = await jutsuRelatedLoader.load(jutsu_parent.id);
	// 	return related_jutsu;
	// }

	// @FieldResolver()
	// async derived_jutsu(
	// 	@Root() jutsu_parent: Jutsu,
	// 	@Ctx() { loaders: { jutsuDerivedLoader } }: IGraphQLContext
	// ): Promise<Jutsu[] | undefined> {
	// 	const derived_jutsus: Jutsu[] = await jutsuDerivedLoader.load(jutsu_parent.id);

	// 	return derived_jutsus;
	// }

	// @FieldResolver()
	// async parent_jutsu(
	// 	@Root() jutsu_parent: Jutsu,
	// 	@Ctx() { loaders: { jutsuParentLoader } }: IGraphQLContext
	// ): Promise<Jutsu[] | undefined> {
	// 	const parent_jutsus: Jutsu[] = await jutsuParentLoader.load(jutsu_parent.id);

	// 	return parent_jutsus;
	// }

	@FieldResolver()
	async classification(
		@Root() jutsu: Jutsu,
		@Ctx() { loaders: { jutsuClassificationLoader } }: IGraphQLContext
	): Promise<ClassificationJutsu[]> {
		const classification: ClassificationJutsu[] = await jutsuClassificationLoader.load(jutsu.id);

		return classification;
	}
}
