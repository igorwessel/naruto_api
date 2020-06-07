import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class BaseManyToMany {
	@Field()
	@PrimaryGeneratedColumn()
	id: Number;

	@Field()
	@Column()
	name: String;
}
