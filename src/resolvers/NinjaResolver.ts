import { Resolver, Query, FieldResolver, Root, Args, Arg, Ctx } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaRepo } from '../repos/NinjaRepo';
import { FamilyRepo } from '../repos/FamilyRepo';

import { Ninja } from '../entity/Ninja';
import { NinjaAttr } from '../entity/Ninja';
import { Tools } from '../entity/Tools';
import { Family } from '../entity/Family';
import { NatureType } from '../entity/NatureType';
import { Team } from '../entity/Team';
import { Jutsu } from '../entity/Jutsu';

import { NinjaFilterInput } from '../types/NinjaInput';
import { IGraphQLContext } from '../types/graphql';
import { PaginationArgs } from '../shared/PaginationArgs';

@Resolver(Ninja)
export class NinjaResolver {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(FamilyRepo)
	private readonly familyRepo: FamilyRepo;

	@Query(() => Ninja)
	async ninja(@Arg('filter') filter: NinjaFilterInput) {
		const ninja = this.ninjaRepo.searchOne(filter);
		return ninja;
	}

	@Query(() => [Ninja])
	async ninjas(
		@Arg('filter', { nullable: true }) filter: NinjaFilterInput,
		@Args() { startIndex, endIndex }: PaginationArgs
	): Promise<Ninja[]> {
		const ninjas = await this.ninjaRepo.searchMany(filter, startIndex, endIndex);

		return ninjas;
	}

	@FieldResolver(() => Tools, { nullable: true })
	async tools(@Root() ninja: Ninja, @Ctx() { loaders: { ninjaToolLoader } }: IGraphQLContext): Promise<Tools[]> {
		const tools: Tools[] = await ninjaToolLoader.load(ninja.id);

		return tools;
	}

	@FieldResolver(() => Family)
	async family(@Root() ninja: Ninja, @Ctx() { loaders: { ninjaFamilyLoader } }: IGraphQLContext): Promise<Family[]> {
		const family: Family[] = await ninjaFamilyLoader.load(ninja.id);
		return family;
	}

	@FieldResolver(() => NatureType, { nullable: true })
	async nature_type(
		@Root() ninja: Ninja,
		@Ctx() { loaders: { ninjaNatureTypeLoader } }: IGraphQLContext
	): Promise<NatureType[]> {
		const nature_type: NatureType[] = await ninjaNatureTypeLoader.load(ninja.id);

		return nature_type;
	}

	@FieldResolver(() => Team)
	async team(@Root() ninja: Ninja, @Ctx() { loaders: { ninjaTeamLoader } }: IGraphQLContext): Promise<Team[]> {
		const team: Team[] = await ninjaTeamLoader.load(ninja.id);

		return team;
	}

	@FieldResolver(() => Jutsu)
	async jutsus(@Root() ninja: Ninja, @Ctx() { loaders: { ninjaJutsuLoader } }: IGraphQLContext): Promise<Jutsu[]> {
		const jutsus: Jutsu[] = await ninjaJutsuLoader.load(ninja.id);

		return jutsus;
	}

	@FieldResolver(() => NinjaAttr)
	async ninja_attributes(
		@Root() ninja: Ninja,
		@Ctx() { loaders: { ninjaAttrLoader } }: IGraphQLContext
	): Promise<NinjaAttr[]> {
		const ninjaAttr: NinjaAttr[] = await ninjaAttrLoader.load(ninja.id);

		return ninjaAttr;
	}
}
