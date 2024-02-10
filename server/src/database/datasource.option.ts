import { DataSource } from 'typeorm';

import dataSourceOptions from './database.config';

const AppDataSource = new DataSource({ ...dataSourceOptions });

export default AppDataSource;
