import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseContent } from '../shared/BaseContent';
import { ObjectType, Field } from 'type-graphql';
import { NinjaJutsu } from './NinjaJutsu';
import { ClassificationJutsu } from './ClassificationJutsu';

@ObjectType()
@Entity()
export class Jutsu extends BaseContent {
	@Field({ nullable: true })
	@Column({ nullable: true })
	range: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	rank: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	hand_seals: String;

	@OneToMany(type => NinjaJutsu, ninja_jutsu => ninja_jutsu.jutsu)
	has_ninja: NinjaJutsu[];

	@Field(type => ClassificationJutsu, { nullable: true })
	@ManyToMany(type => ClassificationJutsu)
	@JoinTable({ name: 'jutsu_classification' })
	classification: ClassificationJutsu[];
}
