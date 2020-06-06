import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

export async function connect(): Promise<void> {
	useContainer(Container);
	await createConnection();
	console.log('Database connected.');
}
