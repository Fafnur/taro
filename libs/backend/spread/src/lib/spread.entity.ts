import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import type { Spread } from '@taro/spreads/common';
import { SpreadType } from '@taro/spreads/common';

@Entity({
  name: 'spreads',
})
export class SpreadEntity implements Spread {
  @PrimaryColumn({ length: 36 })
  uuid!: string;

  @Column({ length: 36 })
  user!: string;

  @Column({
    type: 'enum',
    enum: SpreadType,
  })
  type!: SpreadType;

  @Column({
    type: 'simple-array',
  })
  cards!: number[];

  @Column({
    type: 'simple-array',
  })
  additional!: number[];

  @CreateDateColumn()
  created!: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updated!: string;
}
