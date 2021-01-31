const fs = require('fs').promises;
const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'db',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB || 'naruto_api_development'
});

async function startConnection() {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			}
			resolve(connection);
		});
	});
}

async function getData(directory) {
	try {
		const file = {};

		for (let folder of directory) {
			const files = await fs.readdir(`./setup/sql/${folder}`);
			const sql = [];

			for (let file of files) {
				const data = await fs.readFile(`./setup/sql/${folder}/${file}`, { encoding: 'utf-8' });
				sql.push(...data.split('\n'));
			}
			file[folder] = sql;
		}

		return file;
	} catch (e) {
		console.error(e);
	}
}
module.exports = { startConnection, getData };
