import { PhoneNumber } from "../values/phone-number";
import { UUIDv4 } from "../values/uuid";

export interface IStudent {
  id: UUIDv4;
  name: string;
  lastName: string;
  phoneNo: PhoneNumber;
}

export function Student({
  id,
  name,
  lastName,
  phoneNo,
}: IStudent): IStudent {
  return {
    id,
    name,
    lastName,
    phoneNo,
  }
}
