import { BadRequestException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'node:crypto';
import type { Repository } from 'typeorm';
import { Between, IsNull, LessThan } from 'typeorm';

import type { AuthConfirm, AuthCredentials, AuthResponse } from '@taro/auth/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserService } from '@taro/backend/users';

import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(credentials: AuthCredentials): Promise<void> {
    await this.checkBruteforce(credentials);

    return await this.sendOtp(credentials);
  }

  async confirm(credentials: AuthConfirm): Promise<AuthResponse> {
    await this.verifyOtp(credentials);

    return await this.getJwtResponse(credentials);
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
        bruteforce: {
          code: 'BRUTEFORCE',
          message: 'Exceeded the number of login attempts.',
          expired: expired.toISOString(),
        },
      });
    }
  }

  private async sendOtp({ email }: AuthCredentials): Promise<void> {
    const code = randomInt(0, 99999).toString().padStart(5, '0');
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
        otp: {
          code: 'INVALID_REQUEST',
          message: 'Wrong email or otp',
        },
      });
    }
    if (otp.code !== credentials.code) {
      otp.faults += 1;
      await this.authRepository.save(otp);

      throw new BadRequestException({
        otp: {
          code: 'INVALID_OTP',
          message: 'Wrong email or otp',
        },
      });
    }

    if (otp.expired < new Date()) {
      throw new BadRequestException({
        otp: {
          code: 'OTP_EXPIRED',
          message: 'OTP is expired',
        },
      });
    }

    otp.verified = new Date();
    await this.authRepository.save(otp);
  }

  private async getJwtResponse(credentials: AuthConfirm): Promise<AuthResponse> {
    const user = await this.userService.findOrCreate(credentials.email);

    return {
      accessToken: this.jwtService.sign({ uuid: user.uuid }),
      uuid: user.uuid,
      email: credentials.email,
    };
  }
}
