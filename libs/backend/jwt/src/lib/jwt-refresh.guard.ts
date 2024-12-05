import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  override handleRequest<T>(err: unknown, user: T | null): T | null {
    if (err) {
      throw new BadRequestException({
        code: 'JWT_REFRESH_EXPIRED',
        message: 'Jwt refresh token expired',
      });
    }

    if (!user) {
      new UnauthorizedException({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    }

    return user;
  }
}
