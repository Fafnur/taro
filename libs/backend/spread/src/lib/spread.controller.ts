import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';

import type { JwtPayload } from '@taro/backend/jwt';
import { JwtAuthGuard } from '@taro/backend/jwt';
import { Spread } from '@taro/spreads/common';

import { SpreadChangeForm, SpreadCreateForm } from './spread.form';
import { SpreadService } from './spread.service';

@Controller('spreads')
@UseGuards(JwtAuthGuard)
export class SpreadController {
  constructor(private readonly service: SpreadService) {}

  @Get()
  async load(@Request() req: { user: JwtPayload }): Promise<Spread[]> {
    return this.service.find(req.user.uuid);
  }

  @Post()
  async create(@Body() form: SpreadCreateForm, @Request() req: { user: JwtPayload }): Promise<Spread> {
    return this.service.create(form, req.user.uuid);
  }

  @Patch(':uuid')
  async change(@Request() req: { user: JwtPayload }, @Param() params: { uuid: string }, @Body() form: SpreadChangeForm): Promise<Spread> {
    const spread = await this.service.findOne(params.uuid);
    if (!spread) {
      throw new BadRequestException({
        code: 'INVALID_SPREAD',
        message: `Spread #${params.uuid} not found`,
      });
    }

    return this.service.save({ ...spread, ...form });
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: JwtPayload }, @Param() params: { uuid: string }): Promise<void> {
    const spread = await this.service.findOne(params.uuid);
    if (!spread) {
      throw new BadRequestException({
        code: 'INVALID_SPREAD',
        message: `Spread #${params.uuid} not found`,
      });
    }

    return this.service.delete(params.uuid);
  }

  @Post('sync')
  async sync(@Request() req: { user: JwtPayload }, @Body() spreads: Spread[]): Promise<Spread[]> {
    return this.service.sync(req.user.uuid, spreads);
  }
}
