require('dotenv').config();
const { spawn } = require('child_process');
const fs = require('fs').promises;
const { getData, startConnection, logging } = require('./helpers');
const logger = logging();

async function startServer() {
	return new Promise(async (resolve, reject) => {
		const mysql = await startConnection();
		const haveTables = await new Promise((resolve, reject) =>
			mysql.query(
				`SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA="${process.env.DB}";`,
				(err, results) => {
					if (err) {
						console.error(err);
						reject(err);
					}
					mysql.release();
					if (results.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			)
		);

		if (haveTables) {
			console.log('[/] Não precisou criar as tabelas');
			resolve(null);
			return;
		}

		console.log('[1/4] Iniciando o servidor para criação das tabelas');
		const server = spawn('yarn', ['dev']);

		let maxCounterCreateTable = 28;
		let maxCounterAlterTable = 30;
		const createTable = logging();
		const createAlterTable = logging();

		server.stdout.on('data', data => {
			data = data.toString();
			const table = data.match(/(ALTER TABLE `|CREATE TABLE `)\w+`/g);

			if (table && table[0].includes('CREATE TABLE')) {
				createTable.message(
					`[2/4] Criando a tabela: ${table[0].replace('CREATE TABLE ', '')}`,
					0,
					maxCounterCreateTable
				);
			} else if (table && table[0].includes('ALTER TABLE')) {
				createAlterTable.message(
					`[3/4] Alterando a tabela: ${table[0].replace('ALTER TABLE ', '')}`,
					0,
					maxCounterAlterTable
				);
			}

			if (data.includes('query: COMMIT')) {
				server.kill();
				resolve(server);
			}
		});
	});
}

async function insertData(server) {
	try {
		const files = await fs.readdir(`${__dirname}/init`);
		files.sort((a, b) => {
			const number = parseFloat(a.replace('.sql', ''));
			const numberTwo = parseFloat(b.replace('.sql', ''));

			if (number < numberTwo) {
				return -1;
			} else if (number > numberTwo) {
				return 1;
			}
			return 0;
		});

		const mysql = await startConnection();

		console.log(`${server ? '[4/4]' : '[1/2]'} Iniciando a inserção dos dados`);

		for (file of files) {
			const sql = await fs.readFile(`${__dirname}/init/${file}`, { encoding: 'utf-8' });

			await new Promise((resolve, reject) => {
				mysql.query(sql, (error, result) => {
					if (error) {
						reject(error);
						console.error(error.message.substr(0, 150));
						process.exit(1);
					}
					const table = sql.match(/(?<=INSERT INTO `)\w+/g);

					console.log(`${server ? '[4/4]' : '[2/2]'} Inserindo ${sql.match(table[0])}`);

					resolve(result);
				});
			});
		}

		console.log(`${server ? '[4/4]' : '[2/2]'} Finalizou a inserção dos dados`);

		mysql.destroy();
		return Promise.resolve(process.exit(0));
	} catch (e) {
		console.error(e);
	}
}

async function init() {
	const server = await startServer();
	if (server && !server.killed) process.kill(server.pid);
	await insertData(server);
}

(() => init())();
