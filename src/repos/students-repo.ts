import { Connection } from "typeorm";
import { IStudent, Student } from "../entities/student";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

interface IStudentRow {
  id: string,
  name: string,
  lastName: string,
  phoneNo: string,
}
export class StudentsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<IStudent[]> {
    const rows = await this.connection.query(`
      SELECT * FROM students;
    `) as IStudentRow[]

    return rows.map(x => Student({
      id: UUID(x.id),
      name: x.name,
      lastName: x.lastName,
      phoneNo: new PhoneNumber(x.phoneNo),
    }))
  }

  async add(student: IStudent) {
    const { id, name, lastName, phoneNo } = student
    await this.connection.query(`
      INSERT INTO students
        (id, name, lastName, phoneNo)
      VALUES
        (?, ?, ?, ?);
    `, [id.toString(), name, lastName, phoneNo.toString() ])
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM students WHERE id = ?;
    `, [id.toString()])
  }
}
