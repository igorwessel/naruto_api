import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { NinjaResolver } from './modules/resolvers/NinjaResolver';
import { NinjaAttrResolver } from './modules/resolvers/NinjaAttrResolver';
import { FamilyResolver } from './modules/resolvers/FamilyResolver';

async function startServer(Container: any): Promise<express.Application> {
	const app: express.Application = express();
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [NinjaResolver, NinjaAttrResolver, FamilyResolver],
			container: Container
		}),

		context: ({ req, res }) => ({ req, res })
	});

	server.applyMiddleware({ app, path: '/graphql' });

	return app;
}

export { startServer };
