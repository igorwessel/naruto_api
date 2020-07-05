import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { NinjaAttr } from './Ninja';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Season {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 40 })
	name: String;

	@OneToMany(type => NinjaAttr, ninjaattributes => ninjaattributes.season)
	ninja_has_attributes: NinjaAttr[];
}
