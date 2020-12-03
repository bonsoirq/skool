import { Connection } from "typeorm";
import { Course } from "../entities/course";
import { CoursesRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { UUID, UUIDv4 } from "../values/uuid";

export class CoursesRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<Course[]> {
    const rows = await this.connection.query(`
      SELECT * FROM Courses;
    `) as CoursesRow[]

    return rows.map(x => ({
      id: UUID(x.id),
      name: x.name,
      createdAt: SerializeDate.toObject(x.createdAt)
    }))
  }

  async add(course: Course) {
    const { id, name, createdAt } = course
    await this.connection.query(`
      INSERT INTO Courses
        (id, name, createdAt)
      VALUES
        (?, ?, ?);
    `, [id.toString(), name, SerializeDate.toDatabase(createdAt)])
  }

  async remove(id: UUIDv4) {
    await this.connection.query(`
      DELETE FROM Courses WHERE id = ?;
    `, [id.toString()])
  }
}
