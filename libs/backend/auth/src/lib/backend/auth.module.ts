import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtRefreshTokenStrategy, JwtStrategy } from '@taro/backend/jwt';
import { UsersModule } from '@taro/backend/users';

import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env?.['JWT_SECRET'] ?? '',
      signOptions: { expiresIn: process.env?.['JWT_EXPIRES_IN'] ?? '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
