import { Connection } from "typeorm";
import { Presence } from "../entities/presence";
import { PresenceRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export type DetailedPresenceRow = {
  lessonId: string
  studentId: string
  studentName: string
  advancementLevelName: string;
  admissionCardNumber: string;
  groupName: string;
  createdAt: string;
}

export type DetailedPresence = {
  lessonId: UUIDv4
  studentId: UUIDv4
  studentName: string
  advancementLevelName: string;
  admissionCardNumber: string;
  groupName: string;
  createdAt: Date;
}

export class PresenceRepo {
  tableName = 'Presence'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<Presence[]> {
    const { text, values } = sql
      .select().from(this.tableName)
      .where(criteria).toParams()
    const rows = await this.connection.query(text, values) as PresenceRow[]

    return rows.map(x => ({
      lessonId: UUID(x.lessonId),
      admissionCardNumber: x.admissionCardNumber,
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async findDetailed(criteria = {}): Promise<DetailedPresence[]> {
    const { text, values } = sql
      .select(`lessonId, admissionCardNumber, Presence.createdAt,
      Students.name || ' ' || Students.lastName AS studentName,
      Students.id AS studentId, AdvancementLevels.name AS advancementLevelName,
      Groups.name AS groupName`).from(this.tableName)
      .join('Lessons').on('Lessons.id', 'lessonId')
      .join('AdvancementLevels').on('Lessons.advancementLevelId', 'AdvancementLevels.id')
      .join('Groups').on('Lessons.groupId', 'Groups.id')
      .join('AdmissionCards').on('AdmissionCards.number', 'admissionCardNumber')
      .join('Students').on('AdmissionCards.studentId', 'Students.id')
      .where(criteria).toParams()
    const rows = await this.connection.query(text, values) as DetailedPresenceRow[]

    return rows.map(x => ({
      lessonId: UUID(x.lessonId),
      studentId: UUID(x.studentId),
      studentName: x.studentName,
      admissionCardNumber: x.admissionCardNumber,
      advancementLevelName: x.advancementLevelName,
      groupName: x.groupName,
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async add(presence: Presence) {
    const { lessonId, admissionCardNumber, createdAt } = presence
    const row: PresenceRow = {
      lessonId: lessonId.toString(),
      admissionCardNumber,
      createdAt: SerializeDate.toDatabase(createdAt),
    }
    const { text, values } = sql
      .insert(this.tableName, row).toParams()
    await this.connection.query(text, values)
  }

  async remove(admissionCardNumber: string, lessonId: UUIDv4) {
    const { text, values } = sql
      .delete().from(this.tableName).where({ admissionCardNumber, lessonId: lessonId.toString()}).toParams()
    await this.connection.query(text, values)
  }
}
