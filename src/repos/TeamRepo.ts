import { Team } from '../entity/Team';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Team)
export class TeamRepo extends Repository<Team> {}
