import { ninjaToolLoader } from '../loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from '../loaders/NinjaNatureTypeLoader';

export interface IGraphQLContext {
	loaders: {
		ninjaToolLoader: ReturnType<typeof ninjaToolLoader>;
		ninjaNatureTypeLoader: ReturnType<typeof ninjaNatureTypeLoader>;
	};
}
