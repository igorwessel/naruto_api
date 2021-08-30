import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export abstract class BaseContent {
	@Field(() => Int)
	id: number;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	description: string;
}
