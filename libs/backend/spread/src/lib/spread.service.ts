import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { Spread, SpreadCreate } from '@taro/spreads/common';

import { SpreadEntity } from './spread.entity';

@Injectable()
export class SpreadService {
  constructor(@InjectRepository(SpreadEntity) private readonly repository: Repository<SpreadEntity>) {}

  async count(user?: string): Promise<number> {
    return this.repository.count({ where: { user } });
  }

  async find(user?: string): Promise<SpreadEntity[]> {
    return this.repository.find({ where: { user } });
  }

  async findOne(uuid: string): Promise<SpreadEntity | null> {
    return this.repository.findOneBy({ uuid });
  }

  async create(spread: SpreadCreate, user: string): Promise<SpreadEntity> {
    return this.repository.save({ ...spread, user, cards: [], additional: [] });
  }

  async update(uuid: string, data: Partial<SpreadEntity>): Promise<void> {
    return this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return this.repository.delete({ uuid }).then();
  }

  async save(group: Omit<SpreadEntity, 'cards'>): Promise<SpreadEntity> {
    return this.repository.save(group);
  }

  async sync(owner: string, spreads: Spread[]): Promise<SpreadEntity[]> {
    await this.repository.save(spreads);

    return this.find(owner);
  }
}
