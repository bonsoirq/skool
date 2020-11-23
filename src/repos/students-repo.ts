import { Connection } from "typeorm";
import { IStudent } from "../entities/student";
import { SerializeDate } from "../serializers/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

interface IStudentRow {
  id: string,
  name: string,
  lastName: string,
  phoneNo: string,
  createdAt: string,
}
export class StudentsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<IStudent[]> {
    const rows = await this.connection.query(`
      SELECT * FROM Students;
    `) as IStudentRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      lastName: x.lastName,
      phoneNo: new PhoneNumber(x.phoneNo),
      createdAt: SerializeDate.toObject(x.createdAt),
    }))
  }

  async add(student: IStudent) {
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
