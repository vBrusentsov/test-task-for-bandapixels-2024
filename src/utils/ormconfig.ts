import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {Item} from "../entities/Item";

dotenv.config();

export const appDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Item],
  synchronize: true,
});
