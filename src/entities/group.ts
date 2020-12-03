import { now } from "../util/date";
import { UUID, UUIDv4 } from "../values/uuid";

export type Group = Required<GroupProps>;

type GroupProps = {
  id?: UUIDv4;
  name: string;
  advancementLevelId: UUIDv4;
  createdAt?: Date;
}

export function buildGroup(props: GroupProps): Group {
  return {
    id: UUID(),
    createdAt: now(),
    ...props,
  }
}
