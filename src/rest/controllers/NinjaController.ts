import {
	JsonController,
	Get,
	QueryParams,
	Param,
	UseBefore,
	OnUndefined,
	Req,
	Params,
	Res,
	UseAfter,
	NotFoundError
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
	getOneByIdOrName(@Param('id') id: string) {
		return this.ninjaRepo.findOne({
			relations: ['occupation', 'affiliation', 'classification', 'clan'],
			where: {
				id: parseInt(id)
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

		return family;
	}

	@Get('/ninjas/:id([0-9]+)/tools')
	async getTools(@Param('id') id: number) {
		const tools = await this.ninjaToolsRepo.getByNinjaID(id);

		return tools;
	}
}
