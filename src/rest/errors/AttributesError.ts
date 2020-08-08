import { HttpError } from 'routing-controllers';

export class AttributeNotFound extends HttpError {
	constructor() {
		super(404, 'This ninja dont have attributes.');
	}
}
