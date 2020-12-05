import { Connection } from "typeorm";
import { Lesson } from "../entities/lesson";
import { LessonsRow, LessonsViewRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export class LessonsRepo {
  tableName = 'Lessons'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<Lesson[]> {
    const { text, values } = sql
      .select().from(this.tableName)
      .where(criteria).toParams()
    const rows = await this.connection.query(text, values) as LessonsRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      topic: x.topic,
      advancementLevelId: UUID(x.advancementLevelId),
      groupId: UUID(x.groupId),
      createdAt: SerializeDate.toObject(x.createdAt),
    }))
  }

  async findView(criteria = {}): Promise<LessonsViewRow[]> {
    const { text, values } = sql
      .select().from(`${this.tableName}View`).where(criteria)
      .orderBy('topic').toParams()
    return await this.connection.query(text, values) as LessonsViewRow[]
  }

  async add(lesson: Lesson) {
    const { id, advancementLevelId, groupId, topic, createdAt } = lesson
    const row: LessonsRow = {
      id: id.toString(),
      topic,
      advancementLevelId: advancementLevelId.toString(),
      groupId: groupId.toString(),
      createdAt: SerializeDate.toDatabase(createdAt),
    }
    const { text, values } = sql
      .insert(this.tableName, row).toParams()
    await this.connection.query(text, values)
  }

  async remove(id: UUIDv4) {
    const { text, values } = sql
      .delete().from(this.tableName).where({ id: id.toString()}).toParams()
    await this.connection.query(text, values)
  }
}
