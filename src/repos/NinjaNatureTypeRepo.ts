import { Repository, EntityRepository } from 'typeorm';
import { NinjaNaturetype } from '../entity/Ninja';

@EntityRepository(NinjaNaturetype)
export class NinjaNatureTypeRepo extends Repository<NinjaNaturetype> {}
