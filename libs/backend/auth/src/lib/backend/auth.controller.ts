import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, JwtRefreshGuard } from '@taro/backend/jwt';

import { AuthConfirmForm, AuthCredentialsForm, AuthLogoutForm, AuthRefreshForm } from './auth.form';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: AuthCredentialsForm) {
    return this.authService.login(credentials);
  }

  @Post('auth/confirm')
  async confirm(@Body() confirm: AuthConfirmForm, @Headers('user-agent') userAgent?: string) {
    return this.authService.confirm(confirm, userAgent);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  async refresh(@Body() refresh: AuthRefreshForm, @Headers('user-agent') userAgent?: string) {
    return this.authService.refresh(refresh, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Body() logout: AuthLogoutForm) {
    return this.authService.logout(logout);
  }
}
