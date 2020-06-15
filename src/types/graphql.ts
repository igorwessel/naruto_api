import { ninjaToolLoader } from '../loaders/ToolLoader';

export interface IGraphQLContext {
	loaders: {
		ninjaToolLoader: ReturnType<typeof ninjaToolLoader>;
	};
}
