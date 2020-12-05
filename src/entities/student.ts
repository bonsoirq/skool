import { now } from "../util/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

export type Student = Required<StudentProps>;
export type Gender = 'male' | 'female'

type StudentProps = {
  id?: UUIDv4;
  name: string;
  lastName: string;
  gender: Gender,
  phoneNo: PhoneNumber;
  createdAt?: Date;
}

export function buildStudent(props: StudentProps): Student {
  return {
    id: UUID(),
    createdAt: now(),
    ...props,
  }
}

export const fullName = (student: Student) => `${student.name} ${student.lastName}`
