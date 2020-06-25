import { HttpError } from 'routing-controllers';

export class AttributeNotFound extends HttpError {
	constructor() {
		super(404, 'Attribute not found!');
	}
}
