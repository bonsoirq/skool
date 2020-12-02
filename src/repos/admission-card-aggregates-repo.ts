import { Connection } from "typeorm";
import { AdmissionCardAggregate } from "../aggregates/admission-card-aggregate";
import { AdmissionCard } from "../entities/admission-card";
import { AdmissionCardsRow } from "../generated/row-types";
import { SerializeDate } from "../serializers/date";
import { head } from "../util/array";
import { isNullish } from "../util/function";
import { UUID } from "../values/uuid";
import { AdmissionCardsRepo } from "./admission-cards-repo";
import { StudentsRepo } from "./students-repo";

export class AdmissionCardAggregatesRepo {
  _admissionCardsRepo = new AdmissionCardsRepo(this.connection)
  _studentsRepo = new StudentsRepo(this.connection)
  constructor(private connection: Connection) {
  }

  async findByNumber(number: string): Promise<AdmissionCardAggregate | null> {
    const admissionCard = head(await this._admissionCardsRepo.find({ number }))
    if (admissionCard == null) return null
    const student = head(await this._studentsRepo.find({ id: admissionCard.studentId.toString() }))
    if (student == null) throw Error(`Student for AdmissionCard ${number} hasn't been found!`)

    const aggregate: AdmissionCardAggregate = {
      number: admissionCard.number,
      student,
      createdAt: admissionCard.createdAt
    }

    return aggregate
  }
}
