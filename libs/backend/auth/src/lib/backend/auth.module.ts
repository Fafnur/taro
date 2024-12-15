import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtRefreshTokenStrategy, JwtStrategy } from '@taro/backend/jwt';
import { UsersModule } from '@taro/backend/users';

import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthSessionsEntity } from './auth-sessions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, AuthSessionsEntity]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env?.['JWT_SECRET'],
      signOptions: {
        expiresIn: process.env?.['JWT_EXPIRES_IN'],
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
