import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export abstract class BaseManyToMany {
	@Field(() => Int, { nullable: true })
	id: number;

	@Field({ nullable: true })
	name: string;
}
