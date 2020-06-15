import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ninja } from './Ninja';
import { Team } from '../Team';

@Entity()
export class NinjaTeam {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('boolean')
	leader: Boolean;

	@ManyToOne(type => Ninja, ninja => ninja.has_team)
	ninja: Promise<Ninja>;

	@ManyToOne(type => Team, team => team.has_team)
	team: Promise<Team>;
}
