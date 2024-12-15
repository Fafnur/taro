import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { CARDS } from '@taro/cards/common';

export class Cards1734258033898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const card of CARDS) {
      await queryRunner.query(
        `INSERT INTO cards (id, code, isoCode, major) VALUES (${card.id},"${card.code}","${card.isoCode}","${card.major}");`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM cards;');
  }
}
