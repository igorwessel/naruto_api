import { Repository, EntityRepository } from 'typeorm';
import { NinjaJutsu } from '../entity/Ninja';

@EntityRepository(NinjaJutsu)
export class NinjaJutsuRepo extends Repository<NinjaJutsu> {}
