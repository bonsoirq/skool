import { now } from "../util/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

export type Student = Required<StudentProps>;

type StudentProps = {
  id?: UUIDv4;
  name: string;
  lastName: string;
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
