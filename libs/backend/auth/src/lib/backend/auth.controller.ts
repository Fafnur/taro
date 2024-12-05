import { Body, Controller, Headers, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { formExceptionFactory } from '@taro/backend/core';
import { JwtAuthGuard, JwtRefreshGuard } from '@taro/backend/jwt';

import type { AuthConfirmForm, AuthCredentialsForm, AuthLogoutForm, AuthRefreshForm } from './auth.form';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async login(@Body() credentials: AuthCredentialsForm) {
    return this.authService.login(credentials);
  }

  @Post('auth/confirm')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async confirm(@Body() confirm: AuthConfirmForm, @Headers('user-agent') userAgent?: string) {
    return this.authService.confirm(confirm, userAgent);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async refresh(@Body() refresh: AuthRefreshForm, @Headers('user-agent') userAgent?: string) {
    return this.authService.refresh(refresh, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async logout(@Body() logout: AuthLogoutForm) {
    return this.authService.logout(logout);
  }
}
