import { Family } from './Family';
import { NinjaAttr } from './NinjaAttr';
import { Field, ObjectType, Int } from 'type-graphql';
import { Tools } from './Tools';
import { Clan } from './Clan';
import { Occupation } from './Occupation';
import { Affiliation } from './Affiliation';
import { NatureType } from './NatureType';
import { Team } from './Team';
import { Jutsu } from './Jutsu';
import { Classification } from './Classification';
import { Sex } from '../shared/BaseTypes';

@ObjectType()
export class Ninja {
	@Field(() => Int)
	id: number;

	@Field({ nullable: true })
	name: String;

	@Field({ nullable: true })
	birthdate: String;

	@Field({ nullable: true })
	specie: String;

	@Field(() => NinjaAttr, { nullable: true })
	ninja_attributes: NinjaAttr[];

	@Field({ nullable: true })
	status: String;

	@Field({ nullable: true })
	sex: Sex;

	@Field({ name: 'blood_type', nullable: true })
	bloodType: String;

	@Field({ name: 'ninja_registration', nullable: true })
	ninjaRegistration: String;

	@Field({ name: 'academy_grad_age', nullable: true })
	academyGradAge: String;

	@Field({ name: 'chunin_prom_age', nullable: true })
	chuninPromAge: String;

	@Field(() => Family, { nullable: true })
	family: Ninja[];

	@Field(() => Tools, { nullable: true })
	tools: Tools[];

	@Field(() => Clan, { nullable: true })
	clan: Clan[];

	@Field(() => Occupation, { nullable: true })
	occupation: Occupation[];

	@Field(() => Affiliation, { nullable: true })
	affiliation: Affiliation[];

	@Field(() => Classification, { nullable: true })
	classification: Classification[];

	@Field(() => NatureType, { nullable: true })
	nature_type: NatureType[];

	@Field(() => Team, { nullable: true })
	team: Team[];

	@Field(() => Jutsu, { nullable: true })
	jutsus: Jutsu[];
}
