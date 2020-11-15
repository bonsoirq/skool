import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1605439189074 implements MigrationInterface {
  DATABASE_NAME = 'skool'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(this.DATABASE_NAME)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(this.DATABASE_NAME)
  }

}
