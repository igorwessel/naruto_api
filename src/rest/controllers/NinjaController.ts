import { JsonController, Get, QueryParam, QueryParams } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaRepo } from '../../repos/NinjaRepo';
import { NinjaQueryParams } from '../types/NinjaQueryParams';
import { BaseQueryParams } from '../shared/BaseQueryParams';

@JsonController()
export class NinjaController {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@Get('/ninjas')
	getAll(@QueryParams({ required: false }) query: NinjaQueryParams) {
		return this.ninjaRepo.searchMany(query, query.offset, query.limit);
	}
}
