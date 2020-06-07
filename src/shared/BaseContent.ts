import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class BaseContent {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	name: String;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	literal_english_name: String;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	english_anime_name: String;

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: String;
}
