import { Connection } from "typeorm";
import { AdmissionCard } from "../entities/admission-card";
import { AdmissionCardsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { UUID } from "../values/uuid";

export class AdmissionCardsRepo {
  constructor(private connection: Connection) {
  }
  async all(): Promise<AdmissionCard[]> {
    const rows = await this.connection.query(`
      SELECT * FROM AdmissionCards;
    `) as AdmissionCardsRow[]

    return rows.map(x => ({
      number: x.number,
      studentId: UUID(x.studentId),
      advancementLevelId: UUID(x.advancementLevelId),
      createdAt: SerializeDate.toObject(x.createdAt),
    }))
  }

  async add(admissionCard: AdmissionCard) {
    const { number, studentId, advancementLevelId, createdAt } = admissionCard
    await this.connection.query(`
      INSERT INTO AdmissionCards
        (number, studentId, advancementLevelId, createdAt)
      VALUES
        (?, ?, ?, ?);
    `, [number, studentId.toString(), advancementLevelId.toString(), SerializeDate.toDatabase(createdAt)])
  }
}
