import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import type { AuthConfirm, AuthCredentials, AuthLogout, AuthRefresh } from '@taro/auth/common';

export class AuthCredentialsForm implements AuthCredentials {
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 255)
  readonly email!: string;
}

export class AuthConfirmForm extends AuthCredentialsForm implements AuthConfirm {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly code!: string;
}

export class AuthRefreshForm extends AuthCredentialsForm implements AuthRefresh {
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;
}

export class AuthLogoutForm extends AuthCredentialsForm implements AuthLogout {
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;

  @IsBoolean()
  readonly all!: boolean;
}
