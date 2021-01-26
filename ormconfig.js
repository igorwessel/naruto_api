module.exports = {
	type: 'mysql', //
	host: process.env.DB_HOST || 'localhost', //HOST
	database: 'naruto_api', //NAME OF YOUR SCHEMA
	port: process.env.DB_PORT || 3306, //PORT FOR YOU DB
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
