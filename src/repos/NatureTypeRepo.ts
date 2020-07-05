import { NatureType } from '../entity/NatureType';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(NatureType)
export class NatureTypeRepo extends Repository<NatureType> {}
