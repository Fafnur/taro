import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface Config {
  port: number;
  prefix: string;
  cors: CorsOptions;
}

export function getTypeOrmConfig(): MysqlConnectionOptions {
  return {
    type: process.env.DATABASE_TYPE ?? 'mariadb',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
    username: process.env.DATABASE_USER ?? 'tego',
    password: process.env.DATABASE_PASSWORD ?? '123456',
    database: process.env.DATABASE_NAME ?? 'tego',
    synchronize: process.env.DATABASE_SYNCHRONIZE ? process.env.DATABASE_SYNCHRONIZE === 'true' : true,
    entities: [`${__dirname}/**/*.entity.{ts,js}`, `${join(__dirname, '../../../../../')}libs/backend/**/*.entity.{ts,js}`],
  } as MysqlConnectionOptions;
}

export function configurationFactory(): Config {
  return {
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    prefix: process.env.APP_PREFIX ?? '',
    cors: {
      origin: process.env.CORS_ORIGIN ?? ['http://localhost:4200', 'http://localhost:4000', 'http://localhost:3000'],
      credentials: process.env.CORS_CREDENTIALS ? process.env?.CORS_CREDENTIALS === 'true' : true,
      allowedHeaders: process.env.CORS_ALLOWED_HEADERS ?? ['Content-Type', 'Authorization', 'User-Agent', 'Enctype', 'Cache-Control'],
      methods: process.env.CORS_METHODS ?? 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  };
}

export async function typeOrmFactory(): Promise<TypeOrmModuleOptions> {
  return {
    ...getTypeOrmConfig(),
    autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES ? process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true' : true,
  };
}

// export function mailFactory(configService: ConfigService) {
//   const transport = configService.get<string>('MAIL_TRANSPORT') ?? '';
//   const from = configService.get<string>('MAIL_FROM') ?? '';
//
//   if (!transport || !from) {
//     console.warn('Mail transport is empty.');
//   }
//
//   return {
//     transport,
//     defaults: { from },
//   };
// }
