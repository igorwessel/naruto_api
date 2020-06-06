module.exports = {
	type: null, //YOUR DB
	host: null, //HOST
	port: null, //PORT FOR YOU DB
	username: null, //USERNAME
	password: null, //PASSWORD
	database: null, //NAME OF YOUR SCHEMA
	entities: ['src/entity/**/**.ts'],
	syncronize: true,
	migrations: ['src/migrations/**/**.ts'],
	cli: {
		migrationsDir: ['src/migrations/']
	}
};
