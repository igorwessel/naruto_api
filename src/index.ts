import { startServer } from './app';
import { connect } from './config/typeorm';

import express from 'express';
import Container from 'typedi';
import { useContainer } from 'typeorm';

async function main(): Promise<void> {
	useContainer(Container);
	connect();
	const app: express.Application = await startServer();

	app.listen(8000);
	console.log(`Server start on `, 8000);
	console.log(`REST -> http://localhost:8000/v1/rest`);
	console.log(`GRAPHQL -> http://localhost:8000/v1/graphql`);
}

main();
