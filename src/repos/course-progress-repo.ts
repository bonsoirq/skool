import { Connection } from "typeorm";
import { CourseProgress } from "../entities/course-progress";
import { CourseProgressRow, CourseProgressViewRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export class CourseProgressRepo {
  tableName = 'CourseProgress'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<CourseProgress[]> {
    const { text, values } = sql
      .select().from(this.tableName)
      .where(criteria).toParams()
    const rows = await this.connection.query(text, values) as CourseProgressRow[]

    return rows.map(x => ({
      admissionCardNumber: x.admissionCardNumber,
      advancementLevelId: UUID(x.advancementLevelId),
      groupId: UUID(x.groupId),
      courseId: UUID(x.courseId),
      createdAt: SerializeDate.toObject(x.createdAt),
    }))
  }

  async findView(criteria = {}): Promise<CourseProgressViewRow[]> {
    const { text, values } = sql
      .select().from(`${this.tableName}View`).where(criteria).toParams()
    return await this.connection.query(text, values) as CourseProgressViewRow[]
  }

  async add(courseprogress: CourseProgress) {
    const { admissionCardNumber, advancementLevelId, groupId, courseId, createdAt } = courseprogress
    const row: CourseProgressRow = {
      admissionCardNumber,
      courseId: courseId.toString(),
      advancementLevelId: advancementLevelId.toString(),
      groupId: groupId.toString(),
      createdAt: SerializeDate.toDatabase(createdAt),
    }

    const { text, values } = sql
      .insert(this.tableName, row).toParams()
    await this.connection.query(text, values)
  }

  async remove(admissionCardNumber: string, courseId: UUIDv4) {
    const { text, values } = sql
      .delete().from(this.tableName).where({ admissionCardNumber, courseId: courseId.toString()}).toParams()
    await this.connection.query(text, values)
  }
}
