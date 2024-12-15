import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { hash, verify } from 'argon2';
import { randomInt } from 'node:crypto';
import type { Repository } from 'typeorm';
import { Between, IsNull, LessThan } from 'typeorm';

import type { AuthConfirm, AuthCredentials, AuthLogout, AuthRefresh, AuthResponse } from '@taro/auth/common';
import { UserService } from '@taro/backend/users';

import { AuthEntity } from './auth.entity';
import { AuthSessionsEntity } from './auth-sessions.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(AuthSessionsEntity) private readonly authRefreshRepository: Repository<AuthSessionsEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(credentials: AuthCredentials): Promise<void> {
    await this.checkBruteforce(credentials);

    return await this.sendOtp(credentials);
  }

  async confirm(credentials: AuthConfirm, userAgent?: string): Promise<AuthResponse> {
    await this.verifyOtp(credentials);

    return await this.getJwtResponse(credentials.email, userAgent);
  }

  async refresh(refresh: AuthRefresh, userAgent?: string) {
    await this.checkRefreshToken(refresh);

    return this.getJwtResponse(refresh.email, userAgent);
  }

  async logout(logout: AuthLogout): Promise<void> {
    await this.applyToken(logout);
  }

  private async checkBruteforce({ email }: AuthCredentials): Promise<void> {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);

    const attempts = await this.authRepository.find({
      where: {
        email,
        created: Between(startDate, currentDate),
      },
      order: { id: 'DESC' },
      take: 5,
    });

    if (attempts.length === 5) {
      const expired = new Date(currentDate.setMinutes(currentDate.getMinutes() + 15));
      throw new BadRequestException({
        code: 'BRUTEFORCE',
        message: 'Exceeded the number of login attempts.',
        expired: expired.toISOString(),
      });
    }
  }

  private async sendOtp({ email }: AuthCredentials): Promise<void> {
    const code = randomInt(0, 999999).toString().padStart(6, '0');
    const expired = new Date();
    expired.setMinutes(expired.getMinutes() + 10);

    const otp = this.authRepository.create({ email, code, expired: expired });
    await this.authRepository.save(otp);

    if (process.env['NODE_ENV'] !== 'development') {
      await this.mailerService.sendMail({
        to: email,
        subject: 'OTP code',
        text: `OTP: ${code}`,
      });
    }
  }

  private async verifyOtp(credentials: AuthConfirm): Promise<void> {
    const [otp] = await this.authRepository.find({
      where: {
        email: credentials.email,
        faults: LessThan(10),
        verified: IsNull(),
      },
      order: { id: 'desc' },
      take: 1,
    });

    if (!otp) {
      throw new BadRequestException({
        code: 'INVALID_REQUEST',
        message: 'Wrong email or otp',
      });
    }
    if (otp.code !== credentials.code) {
      otp.faults += 1;
      await this.authRepository.save(otp);

      throw new BadRequestException({
        code: 'INVALID_OTP',
        message: 'Wrong email or otp',
      });
    }

    if (otp.expired < new Date()) {
      throw new BadRequestException({
        code: 'OTP_EXPIRED',
        message: 'OTP is expired',
      });
    }

    otp.verified = new Date();
    await this.authRepository.save(otp);
  }

  private async getJwtResponse(email: string, userAgent?: string): Promise<AuthResponse> {
    const user = await this.userService.findOrCreate(email);
    const accessToken = this.jwtService.sign({ uuid: user.uuid, email });
    const refreshToken = this.jwtService.sign({ uuid: user.uuid, email }, { expiresIn: '14d' });

    const refresh = this.authRefreshRepository.create({
      email,
      userAgent,
      refreshToken: await hash(refreshToken),
    });
    await this.authRefreshRepository.save(refresh);

    return {
      accessToken,
      refreshToken,
      uuid: user.uuid,
      email,
    };
  }

  private async checkRefreshToken(refresh: AuthRefresh): Promise<void> {
    const applied = this.applyToken(refresh);

    if (!applied) {
      throw new ForbiddenException({
        code: 'ACCESS_DENIED',
        message: 'Access Denied',
      });
    }
  }

  private async applyToken(logout: AuthLogout): Promise<boolean> {
    const auths = await this.authRefreshRepository.find({
      where: { email: logout.email, used: IsNull() },
      order: { id: 'desc' },
    });

    if (!auths.length) {
      throw new BadRequestException({
        code: 'INVALID_REQUEST',
        message: 'Wrong email',
      });
    }

    let isEqual = false;
    for (const auth of auths) {
      isEqual = await verify(auth.refreshToken, logout.refreshToken);
      if (isEqual) {
        auth.used = new Date();
        await this.authRefreshRepository.save(auth);
        break;
      }
    }

    return isEqual || !!logout.all;
  }
}
