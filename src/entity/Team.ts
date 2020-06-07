import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Column, Entity, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { NinjaTeam } from './NinjaTeam';

@ObjectType()
@Entity()
export class Team extends BaseManyToMany {
	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: String;

	@OneToMany(type => NinjaTeam, ninjateam => ninjateam.team)
	has_team: NinjaTeam[];
}
