import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Season {
	@Field(() => Int)
	id: Number;

	@Field({ nullable: true })
	name: String;
}
