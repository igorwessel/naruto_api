import { HttpError } from 'routing-controllers';

export class NinjaNotFoundError extends HttpError {
	constructor() {
		super(404, 'Ninja not found!');
	}
}
