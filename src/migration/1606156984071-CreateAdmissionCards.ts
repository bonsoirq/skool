import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdmissionCards1606156984071 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE AdvancementLevels (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        courseId TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `)
    await queryRunner.query(`
      CREATE TABLE AdmissionCards (
        number TEXT PRIMARY KEY NOT NULL,
        studentId TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE AdvancementLevels;`)
    await queryRunner.query(`DROP TABLE AdmissionCards;`)
  }
}
