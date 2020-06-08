import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class BaseContent {
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	name: string;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	literal_english_name: string;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	english_anime_name: string;

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: string;
}
