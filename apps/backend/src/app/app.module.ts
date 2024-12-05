import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'node:path';

import { AuthModule } from '@taro/backend/auth';
import { UsersModule } from '@taro/backend/users';

import { AppController } from './app.controller';
import { configurationFactory, mailFactory, typeOrmFactory } from './config/config';

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
    MailerModule.forRootAsync({
      useFactory: mailFactory,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
