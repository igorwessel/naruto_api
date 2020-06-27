import { JsonController, Get, QueryParams, Param, OnUndefined, NotFoundError, Params } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { NinjaQueryParams } from '../types/NinjaQueryParams';

import { NinjaNotFoundError } from '../errors/NinjaError';
import { JutsuNotFound } from '../errors/JutsusError';
import { AttributeNotFound } from '../errors/AttributesError';

import { NinjaRepo } from '../../repos/NinjaRepo';
import { NinjaAttrRepo } from '../../repos/NinjaAttrRepo';
import { NinjaJutsuRepo } from '../../repos/NinjaJutsuRepo';
import { NinjaToolsRepo } from '../../repos/NinjaToolsRepo';
import { FamilyRepo } from '../../repos/FamilyRepo';
import { NinjaTeamRepo } from '../../repos/NinjaTeamRepo';
import { NinjaNatureTypeRepo } from '../../repos/NinjaNatureTypeRepo';

@JsonController()
export class NinjaController {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(NinjaAttrRepo)
	private readonly ninjaAttrRepo: NinjaAttrRepo;

	@InjectRepository(NinjaJutsuRepo)
	private readonly ninjaJutsuRepo: NinjaJutsuRepo;

	@InjectRepository(NinjaToolsRepo)
	private readonly ninjaToolsRepo: NinjaToolsRepo;

	@InjectRepository(NinjaTeamRepo)
	private readonly ninjaTeamRepo: NinjaTeamRepo;

	@InjectRepository(NinjaNatureTypeRepo)
	private readonly ninjaNatureTypeRepo: NinjaNatureTypeRepo;

	@InjectRepository(FamilyRepo)
	private readonly familyRepo: FamilyRepo;

	@Get('/ninjas')
	@OnUndefined(NinjaNotFoundError)
	async getAll(@QueryParams({ required: false }) { name, limit, offset, clan, sex }: NinjaQueryParams) {
		const ninjas = await this.ninjaRepo.searchMany({ name, clan, sex }, offset, limit);

		return ninjas;
	}

	@Get('/ninjas/:id([0-9]+)')
	@OnUndefined(NinjaNotFoundError)
	getNinjaByID(@Param('id') id: number) {
		return this.ninjaRepo.findOne({
			relations: ['occupation', 'affiliation', 'classification', 'clan'],
			where: {
				id
			}
		});
	}

	@Get('/ninjas/:id([0-9]+)/attributes')
	@OnUndefined(AttributeNotFound)
	getAttributes(@Param('id') id: number) {
		return this.ninjaAttrRepo.getByNinjaID(id);
	}

	@Get('/ninjas/:id([0-9]+)/jutsus')
	async getJutsus(@Param('id') id: number) {
		const jutsus = await this.ninjaJutsuRepo.getByNinjaID(id);

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}

	@Get('/ninjas/:id([0-9]+)/family')
	async getFamily(@Param('id') id: number) {
		const family = await this.familyRepo.getByNinjaID(id);

		if (family.length === 0) throw new NotFoundError("This ninja don't have family.");

		return family;
	}

	@Get('/ninjas/:id([0-9]+)/tools')
	async getTools(@Param('id') id: number) {
		const tools = await this.ninjaToolsRepo.getByNinjaID(id);

		if (tools.length === 0) throw new NotFoundError("This ninja don't have tools.");

		return tools;
	}

	@Get('/ninjas/:id([0-9]+)/teams')
	async getTeams(@Param('id') id: number) {
		const teams = await this.ninjaTeamRepo.getByNinjaID(id);

		if (teams.length === 0) throw new NotFoundError("This ninja don't have teams.");

		return teams;
	}

	@Get('/ninjas/:id([0-9]+)/nature_types')
	async getNatureType(@Param('id') id: number) {
		const nature_type = await this.ninjaNatureTypeRepo.getByNinjaID(id);

		if (nature_type.length === 0) throw new NotFoundError("This ninja don't have nature type.");

		return nature_type;
	}

	@Get('/ninjas/:name([A-z_]+)')
	@OnUndefined(NinjaNotFoundError)
	async getNinjaByName(@Param('name') name: string) {
		name = name ? name.replace('_', ' ').toUpperCase() : undefined;

		return this.ninjaRepo.findOne({
			relations: ['occupation', 'affiliation', 'classification', 'clan'],
			where: {
				name
			}
		});
	}
}
