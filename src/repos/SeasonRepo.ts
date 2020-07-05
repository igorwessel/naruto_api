import { Repository, EntityRepository } from 'typeorm';
import { Season } from '../entity/Season';

@EntityRepository(Season)
export class SeasonRepo extends Repository<Season> {}
