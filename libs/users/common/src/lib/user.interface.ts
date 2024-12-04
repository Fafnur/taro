export const enum UserStatus {
  Base = 'base',
  Pro = 'pro',
  Banned = 'banned',
}

export interface User {
  readonly uuid: string;
  readonly email: string;
  readonly status: UserStatus;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly birthdate?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserChange {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly birthdate?: string;
}
