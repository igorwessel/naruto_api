module.exports = {
	type: 'mysql', //
	host: process.env.DB_HOST || 'localhost', //HOST
	database: 'naruto_api_development', //NAME OF YOUR SCHEMA
	port: 3306, //PORT FOR YOU DB
	username: process.env.DB_USER || 'root', //USERNAME
	password: process.env.DB_PASSWORD || '', //PASSWORD
	entities: ['./src/entity/**/*.ts'],
	synchronize: process.env.NODE_ENV === 'development' ? true : false,
	logging: process.env.NODE_ENV === 'development' ? true : false,
	migrations: ['./src/migrations/**/**.ts'],
	cli: {
		migrationsDir: ['src/migrations/']
	}
};
