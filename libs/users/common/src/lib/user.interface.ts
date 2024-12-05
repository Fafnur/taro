export enum UserStatus {
  Base = 'base',
  Pro = 'pro',
  Banned = 'banned',
}

export interface User {
  readonly uuid: string;
  readonly email: string;
  readonly status: 'base' | 'pro' | 'banned';
  readonly firstname?: string;
  readonly lastname?: string;
  readonly birthdate?: string;
  readonly created: string;
  readonly updated: string;
}

export interface UserChange {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly birthdate?: string;
}
