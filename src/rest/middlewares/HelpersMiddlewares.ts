import * as express from 'express';

export const treatmentName = (
	request: express.Request,
	response: express.Response,
	next: express.NextFunction
): void => {
	const { name } = request.params;

	request.params.name = name.replace(/-/g, ' ');
	next();
};
