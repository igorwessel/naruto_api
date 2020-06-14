import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { RedisCache } from 'apollo-server-cache-redis';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import { NinjaResolver } from './resolvers/NinjaResolver';
import { FamilyResolver } from './resolvers/FamilyResolver';
import { NatureTypeResolver } from './resolvers/NatureTypeResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { NinjaAttrResolver } from './resolvers/NinjaAttrResolver';
import { JutsuResolver } from './resolvers/JutsuResolver';

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
		persistedQueries: {
			cache: new RedisCache()
		},
		tracing: true,
		plugins: [responseCachePlugin()],
		context: ({ req, res }) => ({ req, res })
	});

	server.applyMiddleware({ app, path: '/graphql' });

	return app;
}

export { startServer };
