import { ninjaToolLoader } from '../loaders/NinjaToolLoader';

export interface IGraphQLContext {
	loaders: {
		ninjaToolLoader: ReturnType<typeof ninjaToolLoader>;
	};
}
