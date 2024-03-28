import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DBPASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME

});