import { now } from "../util/date";
import { UUIDv4 } from "../values/uuid";

export type Presence = Required<PresenceProps>;

type PresenceProps = {
  admissionCardNumber: string;
  lessonId: UUIDv4;
  createdAt?: Date;
}

export function buildPresence(props: PresenceProps): Presence {
  return {
    createdAt: now(),
    ...props,
  }
}
