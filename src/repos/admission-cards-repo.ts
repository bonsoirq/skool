import { Connection } from "typeorm";
import { AdmissionCard } from "../entities/admission-card";
import { AdmissionCardsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { head } from "../util/array";
import { UUID } from "../values/uuid";
import sql from '../util/sqlite'

export class AdmissionCardsRepo {
  tableName = 'AdmissionCards'
  constructor(private connection: Connection) {
  }
  async find(criteria = {}): Promise<AdmissionCard[]> {
    const { text, values } = sql
      .select().from(this.tableName).where(criteria).toParams()
    const rows = await this.connection.query(text, values) as AdmissionCardsRow[]

    return rows.map(this._mapRow)
  }

  async findByNumber(number: string) {
    const rows = await this.connection.query(`
      SELECT * FROM AdmissionCards WHERE number = ?;
    `, [number]) as AdmissionCardsRow[]

    return head(rows.map(this._mapRow))
  }

  _mapRow(row: AdmissionCardsRow): AdmissionCard {
    return {
      number: row.number,
      studentId: UUID(row.studentId),
      createdAt: SerializeDate.toObject(row.createdAt),
    }
  }

  async add(admissionCard: AdmissionCard) {
    const { number, studentId, createdAt } = admissionCard
    await this.connection.query(`
      INSERT INTO AdmissionCards
        (number, studentId, createdAt)
      VALUES
        (?, ?, ?);
    `, [number, studentId.toString(), SerializeDate.toDatabase(createdAt)])
  }
}
