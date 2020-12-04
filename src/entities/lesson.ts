import { now } from "../util/date";
import { UUID, UUIDv4 } from "../values/uuid";

export type Lesson = Required<LessonProps>

type LessonProps = {
  id?: UUIDv4;
  topic: string;
  groupId: UUIDv4;
  advancementLevelId: UUIDv4;
  createdAt?: Date;
}

export function buildLesson(props: LessonProps): Lesson {
  return {
    id: UUID(),
    createdAt: now(),
    ...props,
  }
}
