import { Connection } from "typeorm";
import { Student } from "../entities/student";
import { StudentsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

export class StudentsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<Student[]> {
    const rows = await this.connection.query(`
      SELECT * FROM Students;
    `) as StudentsRow[]

    return rows.map(this._mapRow)
  }

  async withNameSimilarTo (name: string, limit: number = 10) {
    const rows = await this.connection.query(`
      SELECT * FROM Students WHERE name || ' ' || lastName LIKE ? LIMIT ?;
    `, [`%${name}%`, limit]) as StudentsRow[]

    return rows.map(this._mapRow)
  }

  private _mapRow = (row: StudentsRow): Student => {
    return {
      id: UUID(row.id),
      name: row.name,
      lastName: row.lastName,
      phoneNo: new PhoneNumber(row.phoneNo),
      createdAt: SerializeDate.toObject(row.createdAt),
    }
  }

  async add(student: Student) {
    const { id, name, lastName, phoneNo, createdAt } = student
    await this.connection.query(`
      INSERT INTO Students
        (id, name, lastName, phoneNo, createdAt)
      VALUES
        (?, ?, ?, ?, ?);
    `, [id.toString(), name, lastName, phoneNo.toString(), SerializeDate.toDatabase(createdAt)])
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM Students WHERE id = ?;
    `, [id.toString()])
  }
}
