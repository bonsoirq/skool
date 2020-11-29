import { Connection } from "typeorm";
import { AdmissionCard } from "../entities/admission-card";
import { AdmissionCardsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { head } from "../util/array";
import { UUID } from "../values/uuid";

export class AdmissionCardsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<AdmissionCard[]> {
    const rows = await this.connection.query(`
      SELECT * FROM AdmissionCards;
    `) as AdmissionCardsRow[]

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
