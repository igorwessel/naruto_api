import { Ninja } from './Ninja';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Family {
	@Field({ nullable: true })
	relationship: String;

	@Field(() => Ninja, { name: 'details', nullable: true })
	details: Ninja;

	parentFrom: Ninja;
	parentTo: Ninja;
}
