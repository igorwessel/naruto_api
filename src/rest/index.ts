import 'reflect-metadata';
import express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import Container from 'typedi';

const applyServerREST = (app: express.Application): void => {
	/**
	 * Apply to express APP, rest
	 */

	useContainer(Container);
	useExpressServer(app, {
		// register created express server in routing-controllers
		controllers: [__dirname + '/controllers/**/*.ts'],
		routePrefix: '/v1/rest'
	});
};

export { applyServerREST };
