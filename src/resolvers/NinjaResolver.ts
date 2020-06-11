import { Resolver, Query, FieldResolver, Root, Args, Arg } from 'type-graphql';
import { Ninja } from '../entity/Ninja';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaAttrRepo } from '../repos/NinjaAttrRepo';
import { NinjaAttr } from '../entity/Ninja';
import { NinjaRepo } from '../repos/NinjaRepo';
import { Tools } from '../entity/Tools';
import { ToolsRepo } from '../repos/ToolsRepo';
import { Family } from '../entity/Family';
import { FamilyRepo } from '../repos/FamilyRepo';
import { NatureType } from '../entity/NatureType';
import { NatureTypeRepo } from '../repos/NatureTypeRepo';
import { Team } from '../entity/Team';
import { TeamRepo } from '../repos/TeamRepo';
import { Jutsu } from '../entity/Jutsu';
import { JutsuRepo } from '../repos/JutsuRepo';
import { PaginationArgs } from '../shared/PaginationArgs';
import { NinjaFilterInput } from '../types/NinjaInput';

@Resolver(Ninja)
export class NinjaResolver {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(ToolsRepo)
	private readonly toolsRepo: ToolsRepo;

	@InjectRepository(FamilyRepo)
	private readonly familyRepo: FamilyRepo;

	@InjectRepository(NinjaAttrRepo)
	private readonly ninjaAttrRepo: NinjaAttrRepo;

	@InjectRepository(NatureTypeRepo)
	private readonly natureTypeRepo: NatureTypeRepo;

	@InjectRepository(JutsuRepo)
	private readonly jutsuRepo: JutsuRepo;

	@InjectRepository(TeamRepo)
	private readonly teamRepo: TeamRepo;

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

	@FieldResolver(() => Tools)
	async tools(@Root() ninja: Ninja): Promise<Tools[]> {
		const tools: Tools[] = await this.toolsRepo
			.createQueryBuilder('tool')
			.innerJoinAndSelect('tool.ninja_tools', 'ninja_tools')
			.where('ninja_tools.ninja = :id', { id: ninja.id })
			.getMany();

		return tools;
	}

	@FieldResolver(() => Family)
	async family(@Root() ninja: Ninja): Promise<Family[]> {
		const family: Family[] = await this.familyRepo
			.createQueryBuilder('family')
			.innerJoinAndSelect('family.parent_to', 'parent_to')
			.where('parent_from = :id', { id: ninja.id })
			.getMany();

		return family;
	}

	@FieldResolver(() => NatureType)
	async nature_type(@Root() ninja: Ninja): Promise<NatureType[]> {
		const nature_type: NatureType[] = await this.natureTypeRepo
			.createQueryBuilder('nature_type')
			.innerJoinAndSelect('nature_type.has_ninja', 'ninja_has_naturetype')
			.where('ninja_has_naturetype.ninja = :id', { id: ninja.id })
			.getMany();

		return nature_type;
	}

	@FieldResolver(() => Team)
	async team(@Root() ninja: Ninja): Promise<Team[]> {
		const team: Team[] = await this.teamRepo
			.createQueryBuilder('team')
			.innerJoinAndSelect('team.has_team', 'ninja_has_team')
			.where('ninja_has_team.ninja = :id', { id: ninja.id })
			.getMany();

		return team;
	}

	@FieldResolver(() => Jutsu)
	async jutsus(@Root() ninja: Ninja): Promise<Jutsu[]> {
		const jutsus: Jutsu[] = await this.jutsuRepo
			.createQueryBuilder('jutsu')
			.innerJoinAndSelect('jutsu.has_ninja', 'ninja_has_jutsu')
			.where('ninja_has_jutsu.ninja = :id', { id: ninja.id })
			.getMany();

		return jutsus;
	}

	@FieldResolver(() => NinjaAttr)
	async ninja_attributes(@Root() ninja: Ninja): Promise<NinjaAttr[]> {
		const ninjaAttr: NinjaAttr[] = await this.ninjaAttrRepo.find({
			where: { ninja: ninja.id },
			relations: ['season']
		});

		return ninjaAttr;
	}
}
