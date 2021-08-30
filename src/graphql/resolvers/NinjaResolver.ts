import { Resolver, Query, FieldResolver, Root, Args, Arg, Ctx } from 'type-graphql';

import { Ninja } from '../../entity/Ninja';
import { NinjaAttr } from '../../entity/NinjaAttr';
import { Tools } from '../../entity/Tools';
import { Family } from '../../entity/Family';
import { NatureType } from '../../entity/NatureType';
import { Team } from '../../entity/Team';
import { Jutsu } from '../../entity/Jutsu';
import { Clan } from '../../entity/Clan';
import { Occupation } from '../../entity/Occupation';
import { Classification } from '../../entity/Classification';

import { NinjaFilterInput } from '../types/NinjaInput';
import { IGraphQLContext } from '../types/Context';
import { PaginationArgs } from '../types/PaginationArgs';
import { ToolsInput } from '../types/ToolsInput';
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
			},
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
	clan(@Root() ninja: Ninja) {
		return ninja.clan;
	}

	@FieldResolver(() => Occupation)
	occupation(@Root() ninja: Ninja) {
		return ninja.occupation;
	}

	@FieldResolver(() => Occupation)
	affiliation(@Root() ninja: Ninja) {
		return ninja.affiliation;
	}

	@FieldResolver(() => Occupation)
	team(@Root() ninja: Ninja) {
		return ninja.team;
	}

	@FieldResolver(() => Tools)
	tools(@Root() ninja: Ninja) {
		return ninja.tools;
	}

	@FieldResolver(() => Classification)
	classification(@Root() ninja: Ninja) {
		return ninja.classification;
	}

	@FieldResolver(() => [Jutsu])
	jutsus(@Root() ninja: Ninja) {
		return ninja.jutsus;
	}

	@FieldResolver(() => NatureType)
	nature_type(@Root() ninja: Ninja) {
		return ninja.nature_type;
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
