import { Min, Max, IsInt } from 'class-validator';

export abstract class BaseQueryParams {
	@IsInt()
	@Min(0)
	offset: number = 0;

	@IsInt()
	@Min(1, { message: 'Precisa ter pelo menos 1 ninja a ser retornado' })
	@Max(30, { message: 'O maximo de ninjas é 30.' })
	limit: number = 15;
}
