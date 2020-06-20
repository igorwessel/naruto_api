import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ContainerInterface } from 'typeorm';

import { NinjaResolver } from './resolvers/NinjaResolver';
import { FamilyResolver } from './resolvers/FamilyResolver';
import { NatureTypeResolver } from './resolvers/NatureTypeResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { NinjaAttrResolver } from './resolvers/NinjaAttrResolver';
import { JutsuResolver } from './resolvers/JutsuResolver';
import { ToolsResolver } from './resolvers/ToolsResolver';

import { ninjaToolLoader } from './loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from './loaders/NinjaNatureTypeLoader';
import { ninjaAttrLoader } from './loaders/NinjaAttrLoader';
import { ninjaJutsuLoader } from './loaders/NinjaJutsuLoader';
import { ninjaTeamLoader } from './loaders/NinjaTeamLoader';
import { ninjaFamilyLoader } from './loaders/NinjaFamilyLoader';
import { teamMembersLoader } from './loaders/TeamMembersLoader';
import { teamLeadersLoader } from './loaders/TeamLeadersLoaders';
import { teamAffiliationLoader } from './loaders/TeamAffiliationLoader';
import { jutsuNatureTypeLoader } from './loaders/JutsuNatureTypeLoader';
import { jutsuClassLoader } from './loaders/JutsuClassLoader';
import { jutsuRelatedLoader } from './loaders/JutsuRelatedLoader';
import { jutsuDerivedLoader } from './loaders/JutsuDerivedLoader';
import { jutsuParentLoader } from './loaders/JutsuParentLoader';
import { jutsuClassificationLoader } from './loaders/JutsuClassificationLoader';

async function startServer(Container: ContainerInterface): Promise<express.Application> {
	const app: express.Application = express();
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				NinjaResolver,
				FamilyResolver,
				NatureTypeResolver,
				TeamResolver,
				NinjaAttrResolver,
				JutsuResolver,
				ToolsResolver
			],
			container: Container,
			emitSchemaFile: path.resolve(__dirname, '../__snapshots__/schema/schema.gql')
		}),
		cacheControl: {
			defaultMaxAge: 86400
		},
		tracing: true,
		context: req => ({
			req,
			loaders: {
				ninjaToolLoader: ninjaToolLoader(),
				ninjaNatureTypeLoader: ninjaNatureTypeLoader(),
				ninjaAttrLoader: ninjaAttrLoader(),
				ninjaJutsuLoader: ninjaJutsuLoader(),
				ninjaTeamLoader: ninjaTeamLoader(),
				ninjaFamilyLoader: ninjaFamilyLoader(),
				teamMembersLoader: teamMembersLoader(),
				teamLeadersLoader: teamLeadersLoader(),
				teamAffiliationLoader: teamAffiliationLoader(),
				jutsuNatureTypeLoader: jutsuNatureTypeLoader(),
				jutsuClassLoader: jutsuClassLoader(),
				jutsuRelatedLoader: jutsuRelatedLoader(),
				jutsuDerivedLoader: jutsuDerivedLoader(),
				jutsuParentLoader: jutsuParentLoader(),
				jutsuClassificationLoader: jutsuClassificationLoader()
			}
		})
	});

	server.applyMiddleware({ app, path: '/graphql' });

	return app;
}

export { startServer };
