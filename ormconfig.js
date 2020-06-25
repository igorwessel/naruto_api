module.exports = {
	type: 'mysql', //
	host: 'db', //HOST
	port: '3306', //PORT FOR YOU DB
	username: 'naruto', //USERNAME
	password: 'sasuke', //PASSWORD
	database: 'naruto_api_development', //NAME OF YOUR SCHEMA
	entities: ['src/entity/**/**.ts'],
	syncronize: process.env.NODE_ENV === 'development' ? true : false,
	logging: process.env.NODE_ENV === 'development' ? true : false,
	migrations: ['src/migrations/**/**.ts'],
	cli: {
		migrationsDir: ['src/migrations/']
	}
};
