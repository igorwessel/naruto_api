import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Family } from '../Family';
import { NinjaAttr } from './NinjaAttr';
import { Field, ObjectType, Int } from 'type-graphql';
import { Tools } from '../Tools';
import { NinjaTools } from './NinjaTools';
import { Clan } from '../Clan';
import { Occupation } from '../Occupation';
import { Affiliation } from '../Affiliation';
import { NinjaNaturetype } from './NinjaNaturetype';
import { NatureType } from '../NatureType';
import { NinjaTeam } from './NinjaTeam';
import { Team } from '../Team';
import { NinjaJutsu } from './NinjaJutsu';
import { Jutsu } from '../Jutsu';
import { Classification } from '../Classification';
import { Sex } from '../../shared/BaseTypes';

@ObjectType()
@Entity()
export class Ninja {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column('varchar', { length: 128, nullable: false })
	name: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 50, nullable: true })
	birthdate: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	specie: String;

	@Field(() => NinjaAttr, { nullable: true })
	ninja_attributes: NinjaAttr[];

	@Field({ nullable: true })
	@Column('varchar', { length: 40, nullable: true })
	status: String;

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

	// @Field({ nullable: true })
	// @Column('text', { nullable: true })
	// unique_traits: String;

	@Field(() => Family, { nullable: true })
	@OneToMany(type => Family, family => family.parent_from)
	family: Ninja[];

	@Field(() => Tools, { nullable: true })
	@OneToMany(type => NinjaTools, ninja_tools => ninja_tools.ninja)
	tools: Tools[];

	@Field(() => Clan, { nullable: true })
	@ManyToMany(type => Clan)
	@JoinTable({ name: 'ninja_clan' })
	clan: Clan[];

	@OneToMany(type => NinjaAttr, ninja_attr => ninja_attr.ninja)
	ninja_has_attributes: NinjaAttr[];

	@Field(() => Occupation, { nullable: true })
	@ManyToMany(type => Occupation)
	@JoinTable({ name: 'ninja_occupation' })
	occupation: Occupation[];

	@Field(() => Affiliation, { nullable: true })
	@ManyToMany(type => Affiliation)
	@JoinTable({ name: 'ninja_affiliation' })
	affiliation: Affiliation[];

	@Field(() => Classification, { nullable: true })
	@ManyToMany(type => Classification)
	@JoinTable({ name: 'ninja_classification' })
	classification: Classification[];

	@Field(() => NatureType, { nullable: true })
	nature_type: NatureType[];

	@OneToMany(type => NinjaNaturetype, ninjanaturetype => ninjanaturetype.ninja)
	has_nature_type: NinjaNaturetype[];

	@Field(() => Team, { nullable: true })
	team: Team[];

	@Field(() => Jutsu, { nullable: true })
	jutsus: Jutsu[];

	@OneToMany(type => NinjaTeam, ninjateam => ninjateam.ninja)
	has_team: NinjaTeam[];

	@OneToMany(type => NinjaJutsu, ninjajutsu => ninjajutsu.ninja)
	has_jutsu: NinjaJutsu[];
}
