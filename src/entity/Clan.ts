import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Clan {
	@Field()
	@PrimaryGeneratedColumn()
	id: Number;

	@Field()
	@Column()
	name: String;
}
