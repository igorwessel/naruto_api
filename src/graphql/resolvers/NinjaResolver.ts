import { Resolver, Query, FieldResolver, Root, Args, Arg, Ctx } from 'type-graphql';

import { Ninja } from '../../entity/Ninja';
import { NinjaAttr } from '../../entity/NinjaAttr';
import { Tools } from '../../entity/Tools';
import { Family } from '../../entity/Family';
import { NatureType } from '../../entity/NatureType';
import { Jutsu } from '../../entity/Jutsu';
import { Clan } from '../../entity/Clan';
import { Occupation } from '../../entity/Occupation';
import { Classification } from '../../entity/Classification';

import { NinjaFilterInput } from '../types/NinjaInput';
import { IGraphQLContext } from '../types/Context';
import { PaginationArgs } from '../types/PaginationArgs';
import { BaseFilterInput } from '../types/BaseFilterInput';

import { NinjaNotFoundError } from '../../rest/errors/NinjaError';

@Resolver(Ninja)
export class NinjaResolver {
	@Query(() => Ninja, { nullable: true })
	async ninja(@Arg('filter') filter: BaseFilterInput, @Ctx() { prisma }: IGraphQLContext) {
		const ninja = await prisma.ninja.findFirst({
			where: {
				...(filter.id && { id: filter.id }),
				...(filter.name && { name: { contains: filter.name } })
			}
		});
		if (!ninja) {
			throw new NinjaNotFoundError();
		}
		return ninja;
	}

	@Query(() => [Ninja])
	async ninjas(
		@Arg('filter', { nullable: true }) filter: NinjaFilterInput,
		@Args() { startIndex, endIndex }: PaginationArgs,
		@Ctx() { prisma: { ninja } }: IGraphQLContext
	) {
		const ninjas = await ninja.findMany({
			...(filter?.name && {
				where: {
					name: {
						contains: filter.name
					}
				}
			}),
			skip: startIndex,
			take: endIndex,
			include: {
				clan: true,
				occupation: true,
				affiliation: true,
				team: true,
				tools: true,
				classification: true,
				nature_type: true,
				jutsus: true
			}
		});
		return ninjas;
	}

	@FieldResolver(() => Clan)
	async clan(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const clan = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).clan();
		return clan;
	}

	@FieldResolver(() => Occupation)
	async occupation(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const occupation = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).occupation();
		return occupation;
	}

	@FieldResolver(() => Occupation)
	async affiliation(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const affiliation = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).affiliation();
		return affiliation;
	}

	@FieldResolver(() => Occupation)
	async team(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const team = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).team();
		return team;
	}

	@FieldResolver(() => Tools)
	async tools(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const tools = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).tools();
		return tools;
	}

	@FieldResolver(() => Classification)
	async classification(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const classification = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).classification();
		return classification;
	}

	@FieldResolver(() => [Jutsu])
	async jutsus(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const jutsu = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).jutsus();
		return jutsu;
	}

	@FieldResolver(() => NatureType)
	async nature_type(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const nature_type = await prisma.ninja.findUnique({ where: { id: ninja.id || undefined } }).nature_type();
		return nature_type;
	}

	@FieldResolver(() => Family)
	async family(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const family = await prisma.ninja
			.findUnique({
				where: { id: ninja.id || undefined }
			})
			.familyParentToIdToNinja({ include: { parentFrom: true } });
		return family;
	}

	@FieldResolver(() => NinjaAttr)
	async ninja_attributes(@Root() ninja: Ninja, @Ctx() { prisma }: IGraphQLContext) {
		const ninja_attributes = await prisma.ninja
			.findUnique({
				where: { id: ninja.id || undefined }
			})
			.ninjaAttr({ include: { season: true } });

		return ninja_attributes;
	}
}
