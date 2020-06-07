import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { NinjaTeam } from './NinjaTeam';
import { Affiliation } from './Affiliation';

@ObjectType()
@Entity()
export class Team extends BaseManyToMany {
	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: String;

	@Field(() => Boolean)
	leader: Boolean;

	@Field(() => Affiliation, { nullable: true })
	@ManyToMany(type => Affiliation)
	@JoinTable({ name: 'team_affiliation' })
	affiliation: Affiliation[];

	@OneToMany(type => NinjaTeam, ninjateam => ninjateam.team)
	has_team: NinjaTeam[];
}
