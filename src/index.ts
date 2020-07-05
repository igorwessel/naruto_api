import { startServer } from './app';
import { connect } from './config/typeorm';

import * as express from 'express';
import Container from 'typedi';
import { useContainer } from 'typeorm';

async function main(): Promise<express.Application> {
	useContainer(Container);
	connect();
	const app: express.Application = await startServer();

	app.listen(8000, () => console.log('\x1b[34m%s\x1b[0m', `
		REST      → http://localhost:8000/v1/rest/
		GraphQL   → http://localhost:8000/v1/graphql
	`));
	return app
}

const server = main();


export default server;
