import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import * as express from 'express';
import { ValidationError } from 'class-validator';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
	error(error: any, _request: express.Request, response: express.Response, _next: express.NextFunction) {
		const resObj = {} as any;

		if (
			Array.isArray(error.errors) &&
			error.errors.every((element: ValidationError) => element instanceof ValidationError)
		) {
			response.status(400);
			resObj.status = error.httpCode;
			resObj.message = 'Você possui erros no body da sua requisição';
			resObj.errors = error.errors.map((error: ValidationError) => ({
				queryParam: error.property,
				constraints: error.constraints
			}));
		} else {
			// set http status
			if (error instanceof HttpError && error.httpCode) {
				response.status(error.httpCode);
			} else {
				response.status(500);
			}

			if (error instanceof Error) {
				const developmentMode: boolean = process.env.NODE_ENV === 'development';

				// set response error fields
				if (error.name && (developmentMode || error.message)) {
					// show name only if in development mode and if error message exist too
					resObj.name = error.name;
				}
				if (error.message) {
					resObj.message = error.message;
				}
				if (error.stack && developmentMode) {
					resObj.stack = error.stack;
				}
			} else if (typeof error === 'string') {
				resObj.message = error;
			}
		}

		response.json(resObj);
	}
}
