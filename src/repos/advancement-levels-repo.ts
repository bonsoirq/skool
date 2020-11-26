import { Connection } from "typeorm";
import { AdvancementLevel } from "../entities/advancement-level";
import { AdvancementLevelsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { UUID, UUIDv4 } from "../values/uuid";

export class AdvancementLevelsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<AdvancementLevel[]> {
    const rows = await this.connection.query(`
      SELECT * FROM AdvancementLevels;
    `) as AdvancementLevelsRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async add(advancementLevel: AdvancementLevel) {
    const { id, name, createdAt } = advancementLevel
    await this.connection.query(`
      INSERT INTO AdvancementLevels
        (id, name, createdAt)
      VALUES
        (?, ?, ?);
    `, [id.toString(), name, SerializeDate.toDatabase(createdAt)])
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM AdvancementLevels WHERE id = ?;
    `, [id.toString()])
  }
}
