require('dotenv').config();
import * as express from 'express';
import { Server } from './app';

(async () => {
	const server: Server = new Server();

	const app: express.Application = await server.start();

	const message: String =
		process.env.NODE_ENV !== 'production'
			? `REST      → http://localhost:${process.env.PORT}/api/v1/rest/\nGraphQL   → http://localhost:${process.env.PORT}/api/v1/graphql`
			: `REST      → http://www.narutoapi.com.br/api/v1/rest/\nGraphQL   → http://www.narutoapi.com.br/api/v1/graphql`;

	app.listen(process.env.PORT || 3000, () => console.log('\x1b[34m%s\x1b[0m', message));
})();
