import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Card } from '@taro/cards/common';

@Entity({
  name: 'cards',
})
export class CardEntity implements Card {
  @PrimaryColumn({
    type: 'smallint',
  })
  id!: number;

  @Column({
    type: 'smallint',
  })
  code!: number;

  @Column({
    length: 5,
  })
  isoCode!: string;

  @Column()
  major!: boolean;
}
