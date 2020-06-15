import { Repository, EntityRepository } from 'typeorm';
import { NinjaTeam } from '../entity/Ninja';

@EntityRepository(NinjaTeam)
export class NinjaTeamRepo extends Repository<NinjaTeam> {}
