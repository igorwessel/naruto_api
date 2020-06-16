import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export abstract class BaseManyToMany {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;
}
