import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpreadController } from './spread.controller';
import { SpreadEntity } from './spread.entity';
import { SpreadService } from './spread.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpreadEntity])],
  controllers: [SpreadController],
  providers: [SpreadService],
  exports: [SpreadService],
})
export class SpreadsModule {}
