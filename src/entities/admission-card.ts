import { now } from "../util/date";
import { UUIDv4 } from "../values/uuid";

type AdmissionCardProps = {
  number: string;
  studentId: UUIDv4;
  createdAt?: Date;
}

export type AdmissionCard = Required<AdmissionCardProps>;

export function buildAdmissionCard(props: AdmissionCardProps): AdmissionCard {
  return {
    createdAt: now(),
    ...props,
  }
}

export const NUMBER_DIGIT_COUNT = 8
