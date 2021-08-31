import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
const prisma = new PrismaClient();

async function main(): Promise<void> {
	const files: string[] = await fs.readdir(`${__dirname}/init`);
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

	for (let file of files) {
		const sql = await fs.readFile(`${__dirname}/init/${file}`, { encoding: 'utf-8' });
		const table = sql.match(/(?<=INSERT INTO `)\w+/g);
		await prisma.$executeRaw(sql);
		console.log(`Seeding in: ${table}`);
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => await prisma.$disconnect());
