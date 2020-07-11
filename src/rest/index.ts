import 'reflect-metadata';
import express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import Container from 'typedi';
import { CustomErrorHandler } from './middlewares/CustomErrorHandler';

const applyServerREST = (app: express.Application): void => {
	/**
	 * Apply to express APP, rest
	 */

	useContainer(Container);
	useExpressServer(app, {
		// register created express server in routing-controllers
		controllers: [__dirname + '/controllers/**/*.ts'],
		middlewares: [CustomErrorHandler],
		routePrefix: '/v1/rest',
		cors: true,
		defaultErrorHandler: false
	});
};

export { applyServerREST };
