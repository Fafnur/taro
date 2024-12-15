import { IsArray, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

import type { SpreadChange, SpreadCreate } from '@taro/spreads/common';
import { SpreadType } from '@taro/spreads/common';

export class SpreadCreateForm implements SpreadCreate {
  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  uuid!: string;

  @IsNotEmpty()
  @IsEnum(SpreadType)
  type!: SpreadType;
}

export class SpreadChangeForm implements SpreadChange {
  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  uuid!: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  cards!: number[];

  @IsNotEmpty()
  @IsArray({ each: true })
  additional!: number[];
}
