import { Connection } from "typeorm"
import { buildCourseProgress } from "../entities/course-progress"
import { Lesson } from "../entities/lesson"
import { AdvancementLevelsRepo } from "../repos/advancement-levels-repo"
import { CourseProgressRepo } from "../repos/course-progress-repo"
import { head } from "../util/array"
import { createStudentProgress } from "./create-student-progress"
import { findStudentProgress } from "./find-student-progress"

export const findOrCreateStudentProgress = async (connection: Connection, admissionCardNumber: string, lesson: Lesson) => {
  const progress = await findStudentProgress(connection, admissionCardNumber, lesson)
  if (progress == null) {
    return await createStudentProgress(connection, admissionCardNumber, lesson)
  }
  return progress
}
