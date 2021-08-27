import {
	JsonController,
	Get,
	QueryParams,
	Param,
	OnUndefined,
	NotFoundError,
	Params,
	UseBefore
} from 'routing-controllers';
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

import { treatmentName } from '../middlewares/NinjasMiddlewares';

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
	async getAttributes(@Param('id') id: number) {
		const attributes = await this.ninjaAttrRepo.getByNinjaID(id);

		if (attributes.length === 0) throw new NotFoundError('This ninja dont have attributes.');

		return attributes;
	}

	@Get('/ninjas/:id([0-9]+)/jutsus')
	async getJutsus(@Param('id') id: number) {
		const jutsus = await this.ninjaJutsuRepo.getByNinjaIDOrName(id);

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}

	@Get('/ninjas/:id([0-9]+)/family')
	async getFamily(@Param('id') id: number) {
		const family = await this.familyRepo.getByNinjaIDOrName(id);

		if (family.length === 0) throw new NotFoundError("This ninja don't have family.");

		return family;
	}

	@Get('/ninjas/:id([0-9]+)/tools')
	async getTools(@Param('id') id: number) {
		const tools = await this.ninjaToolsRepo.getByNinjaIDOrName(id);

		if (tools.length === 0) throw new NotFoundError("This ninja don't have tools.");

		return tools;
	}

	@Get('/ninjas/:id([0-9]+)/teams')
	async getTeams(@Param('id') id: number) {
		const teams = await this.ninjaTeamRepo.getByNinjaIDOrName(id);

		if (teams.length === 0) throw new NotFoundError("This ninja don't have teams.");

		return teams;
	}

	@Get('/ninjas/:id([0-9]+)/nature_types')
	async getNatureType(@Param('id') id: number) {
		const nature_type = await this.ninjaNatureTypeRepo.getByNinjaIDOrName(id);

		if (nature_type.length === 0) throw new NotFoundError("This ninja don't have nature type.");

		return nature_type;
	}

	@Get('/ninjas/:name([A-z_]+)')
	@UseBefore(treatmentName)
	@OnUndefined(NinjaNotFoundError)
	async getNinjaByName(@Param('name') name: string) {
		return this.ninjaRepo.findOne({
			relations: ['occupation', 'affiliation', 'classification', 'clan'],
			where: {
				name
			}
		});
	}

	@Get('/ninjas/:name([A-z_]+)/jutsus')
	@UseBefore(treatmentName)
	async getJutsusByNinjaName(@Param('name') name: string) {
		const jutsus = await this.ninjaJutsuRepo.getByNinjaIDOrName(null, name);

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}

	@Get('/ninjas/:name([A-z_]+)/attributes')
	@UseBefore(treatmentName)
	async getAttributesByName(@Param('name') name: String) {
		const attributes = await this.ninjaAttrRepo.getByNinjaName(name);

		if (attributes.length === 0) throw new NotFoundError('This ninja dont have attributes.');

		return attributes;
	}

	@Get('/ninjas/:name([A-z_]+)/family')
	@UseBefore(treatmentName)
	async getFamilyByNinjaName(@Param('name') name: string) {
		const family = this.familyRepo.getByNinjaIDOrName(null, name);

		return family;
	}

	@Get('/ninjas/:name([A-z_]+)/tools')
	@UseBefore(treatmentName)
	async getToolsByName(@Param('name') name: string) {
		const tools = await this.ninjaToolsRepo.getByNinjaIDOrName(null, name);

		if (tools.length === 0) throw new NotFoundError("This ninja don't have tools.");

		return tools;
	}

	@Get('/ninjas/:name([A-z_]+)/teams')
	@UseBefore(treatmentName)
	async getTeamsByName(@Param('name') name: string) {
		const teams = await this.ninjaTeamRepo.getByNinjaIDOrName(null, name);

		if (teams.length === 0) throw new NotFoundError("This ninja don't have teams.");

		return teams;
	}

	@Get('/ninjas/:name([A-z_]+)/nature_types')
	@UseBefore(treatmentName)
	async getNatureTypeByName(@Param('name') name: string) {
		const nature_type = await this.ninjaNatureTypeRepo.getByNinjaIDOrName(null, name);

		if (nature_type.length === 0) throw new NotFoundError("This ninja don't have nature type.");

		return nature_type;
	}
}
