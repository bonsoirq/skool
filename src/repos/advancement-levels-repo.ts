import { Connection } from "typeorm";
import { AdvancementLevel } from "../entities/advancement-level";
import { AdvancementLevelsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export class AdvancementLevelsRepo {
  tableName = 'AdvancementLevels'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<AdvancementLevel[]> {
    const { text, values } = sql
      .select().from(this.tableName).where(criteria).toParams()
    const rows = await this.connection.query(text, values) as AdvancementLevelsRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      courseId: UUID(x.courseId),
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async add(advancementLevel: AdvancementLevel) {
    const { id, name, courseId, createdAt } = advancementLevel
    await this.connection.query(`
      INSERT INTO AdvancementLevels
        (id, name, courseId, createdAt)
      VALUES
        (?, ?, ?, ?);
    `, [id.toString(), name, courseId.toString(), SerializeDate.toDatabase(createdAt)])
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM AdvancementLevels WHERE id = ?;
    `, [id.toString()])
  }
}
