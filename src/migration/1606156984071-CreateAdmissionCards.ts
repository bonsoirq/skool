import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdmissionCards1606156984071 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE AdvancementLevels (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE AdmissionCards (
        number TEXT PRIMARY KEY,
        studentId TEXT NOT NULL,
        advancementLevelId TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE AdmissionCards;
      DROP TABLE AdvancementLevels;
    `)
  }
}
