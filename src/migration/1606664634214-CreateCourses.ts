import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourses1606664634214 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE Courses (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            createdAt TEXT NOT NULL
          );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE Courses;`)
  }
}
