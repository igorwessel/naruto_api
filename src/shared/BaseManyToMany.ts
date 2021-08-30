import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export abstract class BaseManyToMany {
	@Field(() => Int)
	id: number;

	@Field({ nullable: true })
	name: string;
}
