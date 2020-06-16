import { ninjaToolLoader } from '../loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from '../loaders/NinjaNatureTypeLoader';
import { ninjaAttrLoader } from '../loaders/NinjaAttrLoader';
import { ninjaJutsuLoader } from '../loaders/NinjaJutsuLoader';
import { ninjaTeamLoader } from '../loaders/NinjaTeamLoader';
import { ninjaFamilyLoader } from '../loaders/NinjaFamilyLoader';
import { teamMembersLoader } from '../loaders/TeamMembersLoader';
import { teamLeadersLoader } from '../loaders/TeamLeadersLoaders';
import { teamAffiliationLoader } from '../loaders/TeamAffiliationLoader';

export interface IGraphQLContext {
	loaders: {
		ninjaToolLoader: ReturnType<typeof ninjaToolLoader>;
		ninjaNatureTypeLoader: ReturnType<typeof ninjaNatureTypeLoader>;
		ninjaAttrLoader: ReturnType<typeof ninjaAttrLoader>;
		ninjaJutsuLoader: ReturnType<typeof ninjaJutsuLoader>;
		ninjaTeamLoader: ReturnType<typeof ninjaTeamLoader>;
		ninjaFamilyLoader: ReturnType<typeof ninjaFamilyLoader>;
		teamMembersLoader: ReturnType<typeof teamMembersLoader>;
		teamLeadersLoader: ReturnType<typeof teamLeadersLoader>;
		teamAffiliationLoader: ReturnType<typeof teamAffiliationLoader>;
	};
}