import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { prisma } from '../prisma';

import { NinjaResolver } from './resolvers/NinjaResolver';
import { FamilyResolver } from './resolvers/FamilyResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { NinjaAttrResolver } from './resolvers/NinjaAttrResolver';
import { JutsuResolver } from './resolvers/JutsuResolver';
import { ToolsResolver } from './resolvers/ToolsResolver';

const applyServerGRAPHQL = async (app: express.Application): Promise<void> => {
	/**
	 * Create ApolloServer and Apply to APP Express
	 */
	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [NinjaResolver, FamilyResolver, TeamResolver, NinjaAttrResolver, JutsuResolver, ToolsResolver],
			emitSchemaFile: path.resolve(__dirname, '../../__snapshots__/schema/schema.gql')
		}),
		cacheControl: {
			defaultMaxAge: 86400
		},
		tracing: true,
		context: req => ({
			req,
			prisma
		})
	});

	server.applyMiddleware({ app, path: '/api/v1/graphql' });
};

export { applyServerGRAPHQL };
