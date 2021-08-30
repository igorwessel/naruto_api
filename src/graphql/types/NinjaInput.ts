import { BaseFilterInput } from './BaseFilterInput';
import { Field, InputType } from 'type-graphql';
import { Sex } from '../../shared/BaseTypes';

@InputType()
export class NinjaFilterInput extends BaseFilterInput {
	@Field(() => String, { nullable: true })
	sex: Sex;

	@Field(() => String, { nullable: true })
	blood_type: string;

	@Field(() => String, { nullable: true })
	clan: string;
}
