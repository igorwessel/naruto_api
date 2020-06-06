import { Repository, EntityRepository } from 'typeorm';
import { Ninja } from '../entity/Ninja';

@EntityRepository(Ninja)
export class NinjaRepo extends Repository<Ninja> {}
