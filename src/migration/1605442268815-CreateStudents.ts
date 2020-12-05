import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1605442268815 implements MigrationInterface {
  TABLE_NAME = 'students'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE Students (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        gender TEXT NOT NULL,
        phoneNo TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE Students;`)
  }

}
