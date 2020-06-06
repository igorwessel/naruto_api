import { Repository, EntityRepository } from 'typeorm';
import { Family } from '../entity/Family';

@EntityRepository(Family)
export class FamilyRepo extends Repository<Family> {}
