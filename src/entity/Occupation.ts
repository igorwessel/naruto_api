import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Occupation {
	@Field()
	@PrimaryGeneratedColumn()
	id: Number;

	@Field()
	@Column('varchar')
	name: String;
}
