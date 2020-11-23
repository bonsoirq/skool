import { now } from "../util/date";
import { PhoneNumber } from "../values/phone-number";
import { UUID, UUIDv4 } from "../values/uuid";

export interface IStudent extends IStudentProps {
  id: UUIDv4;
  name: string;
  lastName: string;
  phoneNo: PhoneNumber;
  createdAt: Date;
}

interface IStudentProps {
  id?: UUIDv4;
  name: string;
  lastName: string;
  phoneNo: PhoneNumber;
  createdAt?: Date;
}

export function Student({
  id = UUID(),
  name,
  lastName,
  phoneNo,
  createdAt = now(),
}: IStudentProps): IStudent {
  return {
    id,
    name,
    lastName,
    phoneNo,
    createdAt,
  }
}
