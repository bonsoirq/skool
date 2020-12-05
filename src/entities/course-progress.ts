import { now } from "../util/date";
import { UUIDv4 } from "../values/uuid";

export type CourseProgress = Required<CourseProgressProps>

export type CourseProgressProps = {
  admissionCardNumber: string;
  advancementLevelId: UUIDv4;
  courseId: UUIDv4;
  createdAt?: Date;
  groupId: UUIDv4;
}

export function buildCourseProgress(props: CourseProgressProps): CourseProgress {
  return {
    createdAt: now(),
    ...props,
  }
}
