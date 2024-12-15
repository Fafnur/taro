import { Controller, Get, NotFoundException, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@taro/backend/jwt';
import type { User } from '@taro/users/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async load(@Request() req: { user: { uuid: string } }): Promise<User> {
    const user = await this.userService.findOne(req.user.uuid);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
