import 'reflect-metadata';
import express from 'express';
import path from 'path';

/** ORM */
import { prisma } from './prisma';

/** REST STUFF */
import { useExpressServer } from 'routing-controllers';
import { CustomErrorHandler } from './rest/middlewares/CustomErrorHandler';
import { RateLimiter } from './rest/middlewares/RateLimiterMiddleware';

/** GRAPHQL STUFF */
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '.prisma/client';

import { NinjaResolver } from './graphql/resolvers/NinjaResolver';
import { FamilyResolver } from './graphql/resolvers/FamilyResolver';
import { TeamResolver } from './graphql/resolvers/TeamResolver';
import { NinjaAttrResolver } from './graphql/resolvers/NinjaAttrResolver';
import { JutsuResolver } from './graphql/resolvers/JutsuResolver';
import { ToolsResolver } from './graphql/resolvers/ToolsResolver';

export interface ServerInterface {
	start: () => Promise<express.Application>;
}
class Server implements ServerInterface {
	private _app: express.Application;
	private _prisma: PrismaClient = prisma;

	constructor() {}

	start(): Promise<express.Application> {
		return new Promise(async (resolve, reject) => {
			try {
				this._app = express();
				this._app.use(express.json());
				this._app.use(express.urlencoded({ extended: true }));
				await this.applyServerGRAPHQL();
				await this.applyServerREST();
				resolve(this._app);
			} catch (e) {
				reject(e);
			}
		});
	}

	private async applyServerGRAPHQL(): Promise<void> {
		/**
		 * Create ApolloServer and Apply to APP Express
		 */
		const apolloServer = new ApolloServer({
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
				prisma: this._prisma
			})
		});

		apolloServer.applyMiddleware({ app: this._app, path: '/api/v1/graphql' });
	}

	private async applyServerREST(): Promise<void> {
		/**
		 * Add REST Route to Express
		 */

		useExpressServer(this._app, {
			controllers: [__dirname + '/rest/controllers/**/*.{ts,js}'],
			middlewares: [CustomErrorHandler, RateLimiter],
			routePrefix: '/api/v1/rest',
			cors: true,
			defaultErrorHandler: false
		});
	}
}
export default Server;
export { Server };
