import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

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
			container: Container
		}),

		context: ({ req, res }) => ({ req, res })
	});

	server.applyMiddleware({ app, path: '/graphql' });

	return app;
}

export { startServer };
