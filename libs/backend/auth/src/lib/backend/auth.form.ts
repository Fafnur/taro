import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import type { AuthConfirm, AuthCredentials } from '@taro/auth/common';

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
