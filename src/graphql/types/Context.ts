import { ninjaToolLoader } from '../loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from '../loaders/NinjaNatureTypeLoader';
import { ninjaAttrLoader } from '../loaders/NinjaAttrLoader';
import { ninjaJutsuLoader } from '../loaders/NinjaJutsuLoader';
import { ninjaTeamLoader } from '../loaders/NinjaTeamLoader';
import { ninjaFamilyLoader } from '../loaders/NinjaFamilyLoader';
import { teamMembersLoader } from '../loaders/TeamMembersLoader';
import { teamLeadersLoader } from '../loaders/TeamLeadersLoaders';
import { teamAffiliationLoader } from '../loaders/TeamAffiliationLoader';
import { jutsuNatureTypeLoader } from '../loaders/JutsuNatureTypeLoader';
import { jutsuClassLoader } from '../loaders/JutsuClassLoader';
import { jutsuRelatedLoader } from '../loaders/JutsuRelatedLoader';
import { jutsuParentLoader } from '../loaders/JutsuParentLoader';
import { jutsuDerivedLoader } from '../loaders/JutsuDerivedLoader';
import { jutsuClassificationLoader } from '../loaders/JutsuClassificationLoader';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export interface IGraphQLContext {
	req: ExpressContext;
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
		jutsuNatureTypeLoader: ReturnType<typeof jutsuNatureTypeLoader>;
		jutsuClassLoader: ReturnType<typeof jutsuClassLoader>;
		jutsuRelatedLoader: ReturnType<typeof jutsuRelatedLoader>;
		jutsuParentLoader: ReturnType<typeof jutsuParentLoader>;
		jutsuDerivedLoader: ReturnType<typeof jutsuDerivedLoader>;
		jutsuClassificationLoader: ReturnType<typeof jutsuClassificationLoader>;
	};
}
