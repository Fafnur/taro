export interface AuthCredentials {
  readonly email: string;
}

export interface AuthConfirm extends AuthCredentials {
  readonly code: string;
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly uuid: string;
  readonly email: string;
}
