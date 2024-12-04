import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { formExceptionFactory } from '@taro/backend/core';

import type { AuthConfirmForm, AuthCredentialsForm } from './auth.form';
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
  async confirm(@Body() confirm: AuthConfirmForm) {
    return this.authService.confirm(confirm);
  }
}
