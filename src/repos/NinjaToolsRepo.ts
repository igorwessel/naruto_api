import { Repository, EntityRepository } from 'typeorm';
import { NinjaTools } from '../entity/NinjaTools';

@EntityRepository(NinjaTools)
export class NinjaToolsRepo extends Repository<NinjaTools> {}
