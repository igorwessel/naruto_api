import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
	@Field(type => Int, { defaultValue: 0 })
	@Min(0)
	offset: number;

	@Field(type => Int)
	@Min(1)
	@Max(30)
	limit: number = 15;

	get startIndex(): number {
		return this.offset;
	}

	get endIndex(): number {
		return this.limit;
	}
}
