import { ninjaToolLoader } from '../loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from '../loaders/NinjaNatureTypeLoader';
import { ninjaAttrLoader } from '../loaders/NinjaAttrLoader';
import { ninjaJutsuLoader } from '../loaders/NinjaJutsuLoader';
import { ninjaTeamLoader } from '../loaders/NinjaTeamLoader';

export interface IGraphQLContext {
	loaders: {
		ninjaToolLoader: ReturnType<typeof ninjaToolLoader>;
		ninjaNatureTypeLoader: ReturnType<typeof ninjaNatureTypeLoader>;
		ninjaAttrLoader: ReturnType<typeof ninjaAttrLoader>;
		ninjaJutsuLoader: ReturnType<typeof ninjaJutsuLoader>;
		ninjaTeamLoader: ReturnType<typeof ninjaTeamLoader>;
	};
}
