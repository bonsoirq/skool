import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessons1607012584054 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Groups (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          advancementLevelId TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );
      `)
    await queryRunner.query(`
        CREATE TABLE CourseProgress (
          admissionCardNumber TEXT NOT NULL,
          courseId TEXT NOT NULL,
          advancementLevelId TEXT NOT NULL,
          groupId TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          PRIMARY KEY (admissionCardNumber, courseId)
        );
      `)
    await queryRunner.query(`
        CREATE TABLE Lessons (
          id TEXT PRIMARY KEY NOT NULL,
          topic TEXT NOT NULL,
          groupId TEXT NOT NULL,
          advancementLevelId TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );
      `)
    await queryRunner.query(`
        CREATE TABLE Presence (
          lessonId TEXT NOT NULL,
          admissionCardNumber TEXT NOT NULL,
          studentGroupId TEXT NOT NULL,
          studentGroupName TEXT NOT NULL,
          studentAdvancementLevelId TEXT NOT NULL,
          studentAdvancementLevelName TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          PRIMARY KEY (admissionCardNumber, lessonId)
        );
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE Groups;`)
    await queryRunner.query(`DROP TABLE CourseProgress;`)
    await queryRunner.query(`DROP TABLE Lessons;`)
    await queryRunner.query(`DROP TABLE Presence;`)
  }

}
