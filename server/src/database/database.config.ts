import { join } from 'path';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/**.entity{.ts,.js}'],
  synchronize: false,
  migrations: [join(__dirname, '..', 'database/migrations/*.{ts,js}')],
};

export default dataSourceOptions;
