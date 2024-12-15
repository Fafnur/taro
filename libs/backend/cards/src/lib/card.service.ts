import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { CardEntity } from './card.entity';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly repository: Repository<CardEntity>) {}

  async find(major?: boolean): Promise<CardEntity[]> {
    return this.repository.find({ where: { major } });
  }
}
