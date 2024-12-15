import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest<T>(err: unknown, user: T | null): T | null {
    if (err) {
      throw new BadRequestException({
        code: 'JWT_EXPIRED',
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
