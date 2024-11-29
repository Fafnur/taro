import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';

import { AppController } from './app.controller';
import { configurationFactory, typeOrmFactory } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve('apps/backend/.env'),
      isGlobal: true,
      load: [configurationFactory],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmFactory,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
