import { Entity, Column, OneToMany } from 'typeorm';
import { BaseContent } from '../shared/BaseContent';
import { ObjectType, Field } from 'type-graphql';
import { NinjaJutsu } from './NinjaJutsu';

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
	ninja_jutsu: NinjaJutsu[];
}
