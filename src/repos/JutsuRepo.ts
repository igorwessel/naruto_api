import { Repository, EntityRepository } from 'typeorm';
import { Jutsu } from '../entity/Jutsu';

@EntityRepository(Jutsu)
export class JutsuRepo extends Repository<Jutsu> {}
