import { Repository, EntityRepository } from 'typeorm';
import { NinjaAttr } from '../entity/Ninja';

@EntityRepository(NinjaAttr)
export class NinjaAttrRepo extends Repository<NinjaAttr> {}
