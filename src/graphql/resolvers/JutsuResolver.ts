import { Resolver, FieldResolver, Root, Query, Args, Ctx } from 'type-graphql';

import { Jutsu } from '../../entity/Jutsu';

import { NatureType } from '../../entity/NatureType';

import { PaginationArgs } from '../types/PaginationArgs';
import { IGraphQLContext } from '../types/Context';

@Resolver(Jutsu)
export class JutsuResolver {
	@Query(() => [Jutsu])
	async jutsus(@Args() { startIndex, endIndex }: PaginationArgs, @Ctx() { prisma }: IGraphQLContext) {
		const jutsus = await prisma.jutsu.findMany({
			skip: startIndex,
			take: endIndex
		});

		return jutsus;
	}

	@FieldResolver(() => [NatureType], { nullable: true })
	async nature(@Root() jutsu: Jutsu, @Ctx() { prisma }: IGraphQLContext) {
		const nature_type = await prisma.jutsu.findUnique({ where: { id: jutsu.id || undefined } }).nature_type();
		return nature_type;
	}

	@FieldResolver()
	async class(@Root() jutsu: Jutsu, @Ctx() { prisma }: IGraphQLContext) {
		const jutsuClass = await prisma.jutsu.findUnique({ where: { id: jutsu.id || undefined } }).class();

		return jutsuClass;
	}

	@FieldResolver()
	async classification(@Root() jutsu: Jutsu, @Ctx() { prisma }: IGraphQLContext) {
		const classification = await prisma.jutsu.findUnique({ where: { id: jutsu.id || undefined } }).classification();
		return classification;
	}
}
