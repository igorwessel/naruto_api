import { HttpError } from 'routing-controllers';

export class JutsuNotFound extends HttpError {
	constructor() {
		super(404, 'Jutsu not found!');
	}
}
