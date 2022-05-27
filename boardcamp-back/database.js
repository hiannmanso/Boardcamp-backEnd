import pg from 'pg';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const { Pool } = pg;

// const user = 'postgres';
// const password = `${process.env.PASSWORD}`;
// const host = 'localhost';
// const port = 5432;
// const database = 'meu_banco_de_dados';

// const db = new Pool({
// 	user,
// 	password,
// 	host,
// 	port,
// 	database,
// });
const db = new Pool({
	connectionString: process.env.DATABASE_URL,
});

console.log(chalk.bold.red('Postgres database connected.'));

export default db;
