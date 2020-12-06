import { Connection } from "typeorm";
import { buildGroup, Group } from "../entities/group";
import { GroupsRow, GroupsViewRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import sql from "../util/sqlite";
import { UUID, UUIDv4 } from "../values/uuid";

export class GroupsRepo {
  tableName = 'Groups'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<Group[]> {
    const { text, values } = sql
      .select().from(this.tableName)
      .where(criteria).toParams()
    const rows = await this.connection.query(text, values) as GroupsRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      advancementLevelId: UUID(x.advancementLevelId),
      createdAt: SerializeDate.toObject(x.createdAt),
    }))
  }

  toEntity = (view: GroupsViewRow): Group => {
    return buildGroup({
      id: UUID(view.id),
      name: view.name,
      advancementLevelId: UUID(view.advancementLevelId),
      createdAt: SerializeDate.toObject(view.createdAt),
    })
  }

  async findView(criteria = {}): Promise<GroupsViewRow[]> {
    const { text, values } = sql
      .select().from(`${this.tableName}View`).where(criteria).toParams()
    return await this.connection.query(text, values) as GroupsViewRow[]
  }

  async add(group: Group) {
    const { id, advancementLevelId, name, createdAt } = group
    const row: GroupsRow = {
      id: id.toString(),
      name,
      advancementLevelId: advancementLevelId.toString(),
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
