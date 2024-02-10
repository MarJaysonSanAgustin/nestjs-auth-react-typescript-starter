import { DataSource } from 'typeorm';

import { User } from '../entities/user.entity';

import { DB_CONNECTION_NAME } from 'src/database/database.provider';

export const userProvider = {
  provide: 'USER_PROVIDER',
  useFactory: (datasource: DataSource) => datasource.getRepository(User),
  inject: [DB_CONNECTION_NAME],
};
