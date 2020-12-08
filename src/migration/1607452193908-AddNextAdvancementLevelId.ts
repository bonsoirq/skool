import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNextAdvancementLevelId1607452193908 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE AdvancementLevels ADD COLUMN nextLevelId TEXT;`)
    await queryRunner.query(`ALTER TABLE AdvancementLevels ADD COLUMN position INTEGER NOT NULL DEFAULT 0;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
