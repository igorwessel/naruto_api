import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { Sex } from './BaseTypes';

@ArgsType()
export class BaseArgs {
	@Field(type => Int, { defaultValue: 0 })
	@Min(0)
	skip: number;

	@Field(type => Int)
	@Min(1)
	@Max(30)
	take: number = 15;

	get startIndex(): number {
		return this.skip;
	}

	get endIndex(): number {
		return this.skip + this.take;
	}
}
