import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Occupation {
	@Field()
	id: Number;

	@Field()
	name: String;
}
