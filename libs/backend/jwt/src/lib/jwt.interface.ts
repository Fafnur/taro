export interface JwtPayload {
  readonly sub: string;
  readonly uuid: string;
  readonly email: string;
}
