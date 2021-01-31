module.exports = {
	type: 'mysql', //
	host: process.env.DB_HOST || 'db', //HOST
	database: process.env.DB || 'naruto_api', //NAME OF YOUR SCHEMA
	port: process.env.DB_PORT || 3306, //PORT FOR YOU DB
	username: process.env.DB_USER || 'root', //USERNAME
	password: process.env.DB_PASSWORD || '', //PASSWORD
	entities: [__dirname + '/build/entity/**/*.{ts,js}'],
	synchronize: true,
	logging: process.env.NODE_ENV === 'development' ? true : false,
	migrations: [__dirname + '/build/migrations/**/**.{ts,js}'],
	cli: {
		migrationsDir: ['src/migrations/']
	}
};
