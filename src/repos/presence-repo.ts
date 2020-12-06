import { Connection } from "typeorm";
import { Presence } from "../entities/presence";
import { PresenceRow, PresenceViewRow } from "../generated/row-types";
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
      studentAdvancementLevelId: UUID(x.studentAdvancementLevelId),
      studentAdvancementLevelName: x.studentAdvancementLevelName,
      studentGroupId: UUID(x.studentGroupId),
      studentGroupName:  x.studentGroupName,
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async findView(criteria = {}): Promise<PresenceViewRow[]> {
    const { text, values } = sql
      .select().from(`${this.tableName}View`).where(criteria).toParams()
    return await this.connection.query(text, values) as PresenceViewRow[]
  }

  async add(presence: Presence) {
    const { lessonId, admissionCardNumber, studentAdvancementLevelId,
      studentAdvancementLevelName, studentGroupId,
      studentGroupName, createdAt } = presence
    const row: PresenceRow = {
      lessonId: lessonId.toString(),
      admissionCardNumber,
      studentAdvancementLevelId: studentAdvancementLevelId.toString(),
      studentAdvancementLevelName: studentAdvancementLevelName,
      studentGroupId: studentGroupId.toString(),
      studentGroupName:  studentGroupName,
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
