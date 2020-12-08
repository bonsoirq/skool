import { Connection } from "typeorm";
import { AdvancementLevel } from "../entities/advancement-level";
import { AdvancementLevelsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { last } from "../util/array";
import { isNullish } from "../util/function";
import { omit } from "../util/object";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export class AdvancementLevelsRepo {
  tableName = 'AdvancementLevels'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<AdvancementLevel[]> {
    const { text, values } = sql
      .select().from(this.tableName).where(criteria)
      .order('courseId', 'position').toParams()
      const rows = await this.connection.query(text, values) as AdvancementLevelsRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      courseId: UUID(x.courseId),
      position: x.position,
      nextLevelId: isNullish(x.nextLevelId) ? null : UUID(x.nextLevelId!),
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async last(criteria = {}): Promise<AdvancementLevel | null> {
    const levels = await this.find(criteria)
    return last(levels)
  }

  async add(advancementLevel: AdvancementLevel) {
    const { id, name, courseId, nextLevelId, position, createdAt } = advancementLevel
    const row: AdvancementLevelsRow = {
      id: id.toString(),
      courseId: courseId.toString(),
      name: name.toString(),
      position,
      nextLevelId: isNullish(nextLevelId) ? null : nextLevelId!.toString(),
      createdAt: SerializeDate.toDatabase(createdAt),
    }

    const { text, values } = sql
      .insert(this.tableName, row).toParams()
    await this.connection.query(text, values)
  }

  async save(advancementLevel: AdvancementLevel) {
    const { id, name, courseId, nextLevelId, position, createdAt } = advancementLevel
    const row: AdvancementLevelsRow = {
      id: id.toString(),
      courseId: courseId.toString(),
      name: name.toString(),
      position,
      nextLevelId: isNullish(nextLevelId) ? null : nextLevelId!.toString(),
      createdAt: SerializeDate.toDatabase(createdAt),
    }

    const { text, values } = sql
      .update(this.tableName).set(omit(row, 'id')).where({ id: row.id }).toParams()
    await this.connection.query(text, values)
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM AdvancementLevels WHERE id = ?;
    `, [id.toString()])
  }
}
