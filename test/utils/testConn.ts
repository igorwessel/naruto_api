import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
	return createConnection({
		name: 'default',
		type: 'mysql',
		username: process.env.TYPEORM_USERNAME,
		password: process.env.TYPEORM_PASSWORD,
		port: 3306,
		database: 'naruto_api_test',
		synchronize: drop,
		dropSchema: drop,
		entities: [__dirname + '../../src/entity/**/**.ts']
	});
};
