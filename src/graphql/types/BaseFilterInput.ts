import { Field, Int, InputType } from 'type-graphql';

@InputType()
export class BaseFilterInput {
	@Field(() => Int, { nullable: true })
	id: number;

	@Field(() => String, { nullable: true })
	name: string;
}
