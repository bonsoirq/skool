import { now } from "../util/date";
import { UUID, UUIDv4 } from "../values/uuid";

export type AdvancementLevel = Required<AdvancementLevelProps>;

type AdvancementLevelProps = {
  id?: UUIDv4;
  courseId: UUIDv4;
  name: string;
  nextLevelId?: UUIDv4 | null;
  position: number;
  createdAt?: Date;
}

export function buildAdvancementLevel(props: AdvancementLevelProps): AdvancementLevel {
  return {
    id: UUID(),
    createdAt: now(),
    nextLevelId: null,
    ...props,
  }
}
