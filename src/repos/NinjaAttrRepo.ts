import { Repository, EntityRepository } from 'typeorm';
import { NinjaAttr } from '../entity/NinjaAttr';

@EntityRepository(NinjaAttr)
export class NinjaAttrRepo extends Repository<NinjaAttr> {}
