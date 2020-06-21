import { Min, Max, IsInt } from 'class-validator';

export abstract class BaseQueryParams {
	@IsInt()
	@Min(0)
	offset: number = 0;

	@IsInt()
	@Min(1)
	@Max(30)
	limit: number = 15;
}
