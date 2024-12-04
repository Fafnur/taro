import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async find(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(uuid: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ uuid });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = await this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async update(uuid: string, data: Partial<UserEntity>): Promise<void> {
    return await this.userRepository.update({ uuid }, data).then();
  }
}
