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
import { Request, Response, NextFunction, response } from 'express';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaRepo } from '../../repos/NinjaRepo';
import { NinjaQueryParams } from '../types/NinjaQueryParams';
import { NinjaNotFoundError } from '../errors/NinjaError';
import { NinjaAttrRepo } from '../../repos/NinjaAttrRepo';
import { JutsuNotFound } from '../errors/JutsusError';
import { AttributeNotFound } from '../errors/AttributesError';
import { NinjaJutsuRepo } from '../../repos/NinjaJutsuRepo';

@JsonController()
export class NinjaController {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(NinjaAttrRepo)
	private readonly ninjaAttrRepo: NinjaAttrRepo;

	@InjectRepository(NinjaJutsuRepo)
	private readonly ninjaJutsuRepo: NinjaJutsuRepo;

	@Get('/ninjas')
	@OnUndefined(NinjaNotFoundError)
	async getAll(@QueryParams({ required: false }) { name, limit, offset, clan, sex }: NinjaQueryParams) {
		const ninjas = await this.ninjaRepo.searchMany({ name, clan, sex }, offset, limit);

		return ninjas;
	}

	@Get('/ninjas/:id([0-9]+)?')
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
	getAttributes(@Param('id') id: string) {
		return this.ninjaAttrRepo.getByNinjaID(id);
	}

	@Get('/ninjas/:id([0-9]+)/jutsus')
	async getJutsus(@Param('id') id: string) {
		const jutsus = await this.ninjaJutsuRepo.getByNinjaID(id);

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}
}
