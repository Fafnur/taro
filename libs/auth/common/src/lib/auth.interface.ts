export interface AuthCredentials {
  readonly email: string;
}

export interface AuthConfirm extends AuthCredentials {
  readonly code: string;
}

export interface AuthRefresh extends AuthCredentials {
  readonly refreshToken: string;
}

export interface AuthLogout extends AuthCredentials {
  readonly refreshToken: string;
  readonly all?: boolean;
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly uuid: string;
  readonly email: string;
}
