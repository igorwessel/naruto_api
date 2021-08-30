import { BaseFilterInput } from './BaseFilterInput';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ToolsInput {
	@Field(() => String, { nullable: true })
	name: string;
}
