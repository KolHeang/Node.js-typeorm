import 'reflect-metadata';
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === 'development' ? false : false,
    logging: true,
    entities: [__dirname + "/../entities/**/*.{ts,js}"],
    migrations: [__dirname + "/../migrations/**/*.{ts,js}"],
    subscribers: []
})