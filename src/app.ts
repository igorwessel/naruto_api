import 'reflect-metadata';
import express from 'express';
import { applyServerGRAPHQL } from './graphql';
import { applyServerREST } from './rest';

async function startServer(): Promise<express.Application> {
	/**
	 * Create application express, create graphql Route with Schema and Apollo Server and create rest route
	 */

	const app: express.Application = express();

	applyServerGRAPHQL(app);

	applyServerREST(app);

	return app;
}

export { startServer };
