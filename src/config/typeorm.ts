import { createConnection } from 'typeorm';

export async function connect(): Promise<void> {
	/**
	 * Create a connection with database
	 */
	await createConnection();
}
