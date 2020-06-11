import { BaseFilterInput } from '../shared/BaseFilterInput';
import { Field, InputType } from 'type-graphql';
import { Sex } from '../shared/BaseTypes';

@InputType()
export class NinjaFilterInput extends BaseFilterInput {
	@Field(() => String, { nullable: true })
	sex: Sex;

	@Field(() => String, { nullable: true })
	blood_type: String;

	// @Field(() => String, { nullable: true })
	// tool: String;
}
