module.exports = {
	type: 'mysql', //
	host: 'localhost', //HOST
	database: 'naruto_api_development', //NAME OF YOUR SCHEMA
	port: 3306, //PORT FOR YOU DB
	username: process.env.DB_USER || 'root', //USERNAME
	password: process.env.DB_PASSWORD || '', //PASSWORD
	entities: ['./build/entity/**/*.js'],
	synchronize: process.env.NODE_ENV === 'development' ? true : false,
	logging: process.env.NODE_ENV === 'development' ? true : false,
	migrations: ['./build/migrations/**/**.js'],
	cli: {
		migrationsDir: ['src/migrations/']
	}
};
