import { Repository, EntityRepository } from 'typeorm';
import { NinjaNaturetype } from '../entity/NinjaNaturetype';

@EntityRepository(NinjaNaturetype)
export class NinjaNatureTypeRepo extends Repository<NinjaNaturetype> {}
