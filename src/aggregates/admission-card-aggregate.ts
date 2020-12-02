import { Student } from "../entities/student";

export type AdmissionCardAggregate = {
  number: string,
  createdAt: Date,
  student: Student,
}
