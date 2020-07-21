import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export abstract class BaseContent {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	name: string;

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	description: string;
}
