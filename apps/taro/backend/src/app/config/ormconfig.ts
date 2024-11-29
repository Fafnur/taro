import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource } from 'typeorm';

import { getTypeOrmConfig } from './config';

config({
  path: 'apps/backend/.env',
});

export const datasource = new DataSource({
  ...getTypeOrmConfig(),
  entities: [`${join(__dirname, '../')}**/*.entity.{ts,js}`, `${join(__dirname, '../../../../../')}libs/backend/**/*.entity.{ts,js}`],
  migrations: [`${join(__dirname, '../../../../../')}apps/backend/migrations/**/*{.ts,.js}`],
});
