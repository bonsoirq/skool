import { now } from "../util/date";
import { UUID, UUIDv4 } from "../values/uuid";

export type Course = Required<CourseProps>;

type CourseProps = {
  id?: UUIDv4;
  name: string;
  createdAt?: Date;
}

export function buildCourse(props: CourseProps): Course {
  return {
    id: UUID(),
    createdAt: now(),
    ...props,
  }
}
