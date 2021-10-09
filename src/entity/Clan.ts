import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Clan {
	@Field()
	id: Number;

	@Field()
	name: String;
}
