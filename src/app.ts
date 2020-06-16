import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import { NinjaResolver } from './resolvers/NinjaResolver';
import { FamilyResolver } from './resolvers/FamilyResolver';
import { NatureTypeResolver } from './resolvers/NatureTypeResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { NinjaAttrResolver } from './resolvers/NinjaAttrResolver';
import { JutsuResolver } from './resolvers/JutsuResolver';

import { ninjaToolLoader } from './loaders/NinjaToolLoader';
import { ninjaNatureTypeLoader } from './loaders/NinjaNatureTypeLoader';
import { ninjaAttrLoader } from './loaders/NinjaAttrLoader';
import { ninjaJutsuLoader } from './loaders/NinjaJutsuLoader';
import { ninjaTeamLoader } from './loaders/NinjaTeamLoader';
import { ninjaFamilyLoader } from './loaders/NinjaFamilyLoader';

async function startServer(Container: any): Promise<express.Application> {
	const app: express.Application = express();
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [NinjaResolver, FamilyResolver, NatureTypeResolver, TeamResolver, NinjaAttrResolver, JutsuResolver],
			container: Container,
			emitSchemaFile: path.resolve(__dirname, '../__snapshots__/schema/schema.gql')
		}),
		cacheControl: {
			defaultMaxAge: 86400
		},
		tracing: true,
		plugins: [responseCachePlugin()],
		context: () => ({
			loaders: {
				ninjaToolLoader: ninjaToolLoader(),
				ninjaNatureTypeLoader: ninjaNatureTypeLoader(),
				ninjaAttrLoader: ninjaAttrLoader(),
				ninjaJutsuLoader: ninjaJutsuLoader(),
				ninjaTeamLoader: ninjaTeamLoader(),
				ninjaFamilyLoader: ninjaFamilyLoader()
			}
		})
	});

	server.applyMiddleware({ app, path: '/graphql' });

	return app;
}

export { startServer };
