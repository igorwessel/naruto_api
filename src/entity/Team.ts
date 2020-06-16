import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { NinjaTeam, Ninja } from './Ninja';
import { Affiliation } from './Affiliation';
import { Jutsu } from './Jutsu';

@ObjectType()
@Entity()
export class Team extends BaseManyToMany {
	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: String;

	@Field(() => Boolean)
	leader: Boolean;

	@Field(() => Ninja, { nullable: true })
	members: Ninja[];

	@Field(() => Ninja, { nullable: true })
	leaders: Ninja[];

	@Field(() => Affiliation, { nullable: true })
	@ManyToMany(type => Affiliation)
	@JoinTable({ name: 'team_affiliation' })
	affiliation: Affiliation[];

	@Field(() => Jutsu, { nullable: true })
	@ManyToMany(type => Jutsu)
	@JoinTable({ name: 'team_jutsu' })
	jutsu: Jutsu[];

	@OneToMany(type => NinjaTeam, ninjateam => ninjateam.team)
	has_team: NinjaTeam[];
}
