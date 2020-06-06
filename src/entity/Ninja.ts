import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Family } from './Family';
import { NinjaAttr } from './NinjaAttr';
import { Field, ObjectType } from 'type-graphql';
import { Tools } from './Tools';
import { NinjaTools } from './NinjaTools';

export enum Sex {
	Male = 'Male',
	Female = 'Female',
	Various = 'Various'
}

@ObjectType()
@Entity()
export class Ninja {
	@Field()
	@PrimaryGeneratedColumn()
	id: Number;

	@Field()
	@Column('varchar', { length: 128, nullable: false })
	name: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 50, nullable: true })
	birthdate: String;

	@Field(() => NinjaAttr, { nullable: true })
	ninja_attributes: NinjaAttr[];

	@Field({ nullable: true })
	@Column('enum', { enum: Sex, nullable: true })
	sex: Sex;

	@Field({ nullable: true })
	@Column('varchar', { length: 10, nullable: true })
	blood_type: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 30, nullable: true })
	ninja_registration: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 10, nullable: true })
	academy_grad_age: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 10, nullable: true })
	chunin_prom_age: String;

	@Field({ nullable: true })
	@Column('text', { nullable: true })
	unique_traits: String;

	@OneToMany(type => Family, family => family.parent_from)
	family: Ninja[];

	@Field(() => Tools, { nullable: true })
	@OneToMany(type => NinjaTools, ninja_tools => ninja_tools.ninja)
	tools: Tools[];

	@OneToMany(type => NinjaAttr, ninja_attr => ninja_attr.ninja)
	ninja_has_attributes: NinjaAttr[];
}
