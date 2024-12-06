import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { Spread } from '@taro/spreads/common';
import { SpreadType } from '@taro/spreads/common';

@Entity({
  name: 'spreads',
})
export class SpreadEntity implements Spread {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({
    type: 'enum',
    enum: SpreadType,
  })
  type!: SpreadType;

  @Column()
  cards!: number[];
}
