require('dotenv').config();
import { startServer } from './app';
import { connect } from './config/typeorm';

import * as express from 'express';
import Container from 'typedi';
import { useContainer } from 'typeorm';

async function main(): Promise<express.Application> {
	useContainer(Container);
	connect();
	const app: express.Application = await startServer();
	const message: String =
		process.env.NODE_ENV !== 'production'
			? `REST      → http://localhost:${process.env.PORT}/api/v1/rest/
			 GraphQL   → http://localhost:${process.env.PORT}/api/v1/graphql`
			: `REST      → http://www.narutoapi.com.br/api/v1/rest/
			 GraphQL   → http://www.narutoapi.com.br/api/v1/graphql`;

	app.listen(process.env.PORT || 8000, () => console.log('\x1b[34m%s\x1b[0m', message));
	return app;
}

const server = main();

export default server;
