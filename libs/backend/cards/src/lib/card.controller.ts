import { Controller, Get, Query } from '@nestjs/common';

import { Card } from '@taro/cards/common';

import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly service: CardService) {}

  @Get()
  async load(@Query() query: { readonly major?: boolean }): Promise<Card[]> {
    return this.service.find(query.major);
  }
}
