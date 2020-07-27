require('dotenv').config();
const { spawn } = require('child_process');
const fs = require('fs/promises');
const { getData, startConnection } = require('./helpers');

async function startServer() {
	return new Promise(async (resolve, reject) => {
		const server = spawn('yarn', ['dev']);
		const mysql = await startConnection();
		const haveTables = await new Promise((resolve, reject) =>
			mysql.query(
				`SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA="${
					process.env.NODE_ENV === 'development' ? 'naruto_api_development' : 'naruto_api'
				}";`,
				(err, results) => {
					if (err) {
						console.error(err);
						reject(err);
					}
					if (results.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			)
		);

		mysql.end();

		if (haveTables) {
			console.log('[1/4] Não precisou criar as tabelas');
			server.kill();
			resolve();
		}

		console.log('[1/4] Iniciando o servidor para criação das tabelas');

		server.on('error', error => {
			console.error(error);
			reject(error);
		});

		server.stderr.on('data', data => {
			data = data.toString();
			console.error(data);
		});

		server.stdout.on('data', data => {
			data = data.toString();

			if (data.includes('query: COMMIT')) {
				server.kill();
				resolve(server);
			}
		});
	});
}

async function insertData() {
	try {
		const dir = await fs.readdir('./setup/sql');
		const sqls = await getData(dir);
		const mysql = await startConnection();

		console.log('[2/4] Se conectou ao MYSQL');
		console.log('[3/4] Iniciando a inserção dos dados');

		for (let folder of dir) {
			for (let sql of sqls[folder]) {
				await new Promise((resolve, reject) =>
					mysql.query(sql, (error, result) => {
						if (error) {
							console.error(error);
						}

						resolve(result);
					})
				);
			}
		}

		console.log('[4/4] Finalizou a inserção dos dados');
		mysql.end();
		return Promise.resolve(process.exit(1));
	} catch (e) {
		console.error(e);
	}
}

async function init() {
	const server = await startServer();
	if (server && !server.killed) process.kill(server.pid);
	await insertData();
}

(() => console.log(process.env))();
