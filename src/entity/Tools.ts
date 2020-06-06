import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NinjaTools } from './NinjaTools';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Tools {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 50, nullable: true })
	name: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 50, nullable: true })
	literal_english_name: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 50, nullable: true })
	english_anime_name: String;

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: String;

	@OneToMany(type => NinjaTools, ninja_tools => ninja_tools.tools)
	ninja_tools: NinjaTools[];
}
