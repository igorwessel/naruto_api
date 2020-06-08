import { Repository, EntityRepository } from 'typeorm';
import { NinjaTools } from '../entity/Ninja';

@EntityRepository(NinjaTools)
export class NinjaToolsRepo extends Repository<NinjaTools> {}
