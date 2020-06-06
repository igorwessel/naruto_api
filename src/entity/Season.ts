import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { NinjaAttr } from './NinjaAttr';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Season {
	@Field()
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 40 })
	name: String;

	@OneToMany(type => NinjaAttr, ninjaattributes => ninjaattributes.season)
	ninja_has_attributes: NinjaAttr[];
}
