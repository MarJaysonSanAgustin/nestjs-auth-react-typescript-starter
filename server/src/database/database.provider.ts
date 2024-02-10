import AppDataSource from './datasource.option';

export const DB_CONNECTION_NAME = 'DB_CONNECTION';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_NAME,
    useFactory: async () => await AppDataSource.initialize(),
  },
];
