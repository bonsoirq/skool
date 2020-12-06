import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableViews1607192857284 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE VIEW AdmissionCardsView AS SELECT
      AdmissionCards.number, AdmissionCards.createdAt, AdmissionCards.studentId,
      Students.name AS studentName, Students.lastName AS studentLastName,
      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender
      FROM AdmissionCards
      JOIN Students ON Students.id = AdmissionCards.studentId;
    `)

    queryRunner.query(`
      CREATE VIEW GroupsView AS SELECT
      Groups.id, Groups.advancementLevelId, Groups.name, Groups.createdAt,
      AdvancementLevels.courseId, AdvancementLevels.name AS advancementLevelName,
      Courses.name AS courseName
      FROM Groups
      JOIN AdvancementLevels ON AdvancementLevels.id = Groups.advancementLevelId
      JOIN Courses ON Courses.id = AdvancementLevels.courseId;
    `)
    queryRunner.query(`
      CREATE VIEW PresenceView AS SELECT
      Presence.admissionCardNumber, Presence.createdAt, Presence.lessonId,
      Presence.studentGroupId, Presence.studentGroupName,
      Presence.studentAdvancementLevelId, Presence.studentAdvancementLevelName,
      Lessons.topic AS lessonTopic, Lessons.groupId, Lessons.advancementLevelId,
      AdmissionCards.studentId,
      Students.name AS studentName, Students.lastName AS studentLastName,
      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender,
      Groups.name AS groupName,
      AdvancementLevels.name AS advancementLevelName,
      Courses.name AS courseName
      FROM Presence
      JOIN Lessons ON Lessons.id = Presence.lessonId
      JOIN AdmissionCards ON AdmissionCards.number = Presence.admissionCardNumber
      JOIN Students ON Students.id = AdmissionCards.studentId
      JOIN Groups ON Groups.id = Lessons.groupId
      JOIN AdvancementLevels ON AdvancementLevels.id = Lessons.advancementLevelId
      JOIN Courses ON Courses.id = AdvancementLevels.courseId
    `)
    queryRunner.query(`
      CREATE VIEW CourseProgressView AS SELECT
      CourseProgress.admissionCardNumber, CourseProgress.createdAt,
      CourseProgress.advancementLevelId, CourseProgress.groupId,
      CourseProgress.courseId,
      AdmissionCards.studentId,
      Students.name AS studentName, Students.lastName AS studentLastName,
      Students.phoneNo AS studentPhoneNo, Students.gender AS studentGender,
      Groups.name AS groupName,
      AdvancementLevels.name AS advancementLevelName,
      Courses.name AS courseName
      FROM CourseProgress
      JOIN AdmissionCards ON AdmissionCards.number = CourseProgress.admissionCardNumber
      JOIN Students ON Students.id = AdmissionCards.studentId
      JOIN Groups ON Groups.id = CourseProgress.groupId
      JOIN AdvancementLevels ON AdvancementLevels.id = CourseProgress.advancementLevelId
      JOIN Courses ON Courses.id = CourseProgress.courseId
    `)
    queryRunner.query(`
    CREATE VIEW LessonsView AS SELECT
    Lessons.id, Lessons.topic, Lessons.groupId, Lessons.advancementLevelId, Lessons.createdAt,
    Groups.name AS groupName,
    AdvancementLevels.name AS advancementLevelName, AdvancementLevels.courseId,
    Courses.name AS courseName
    FROM Lessons
    JOIN Groups ON Groups.id = Lessons.groupId
    JOIN AdvancementLevels ON AdvancementLevels.id = Lessons.advancementLevelId
    JOIN Courses ON Courses.id = AdvancementLevels.courseId
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP VIEW IF EXISTS AdmissionCardsView`)
    queryRunner.query(`DROP VIEW IF EXISTS PresenceView`)
    queryRunner.query(`DROP VIEW IF EXISTS GroupsView`)
    queryRunner.query(`DROP VIEW IF EXISTS CourseProgressView`)
    queryRunner.query(`DROP VIEW IF EXISTS LessonsView`)
  }

}
