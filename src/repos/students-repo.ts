import { Connection } from "typeorm";
import { Gender, Student } from "../entities/student";
import { StudentsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";
import sql from '../util/sqlite'

export class StudentsRepo {
  tableName = 'Students'
  constructor(private connection: Connection) {
  }

  async find(criteria = {}): Promise<Student[]> {
    const { text, values } = sql
      .select().from(this.tableName).where(criteria).toParams()
    const rows = await this.connection.query(text, values) as StudentsRow[]

    return rows.map(this._mapRow)
  }

  async withNameSimilarTo (name: string, limit: number = 10) {
    const { text, values } = sql
      .select().from(this.tableName)
      .where(sql.like(`name || ' ' || lastName`, `%${name}%`))
      .limit(limit).toParams()
    const rows = await this.connection.query(text, values) as StudentsRow[]

    return rows.map(this._mapRow)
  }

  private _mapRow = (row: StudentsRow): Student => {
    return {
      id: UUID(row.id),
      name: row.name,
      lastName: row.lastName,
      gender: row.gender as Gender,
      phoneNo: new PhoneNumber(row.phoneNo),
      createdAt: SerializeDate.toObject(row.createdAt),
    }
  }

  async add(student: Student) {
    const { id, name, lastName, gender, phoneNo, createdAt } = student
    const row: StudentsRow = {
      id: id.toString(),
      name,
      lastName,
      gender,
      phoneNo: phoneNo.toString(),
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
