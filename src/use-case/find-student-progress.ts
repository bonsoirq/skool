import { Connection } from "typeorm"
import { Lesson } from "../entities/lesson"
import { AdvancementLevelsRepo } from "../repos/advancement-levels-repo"
import { CourseProgressRepo } from "../repos/course-progress-repo"
import { head } from "../util/array"

export const findStudentProgress = async (connection: Connection, admissionCardNumber: string, lesson: Lesson) => {
  const repo = new CourseProgressRepo(connection)
  const levelRepo = new AdvancementLevelsRepo(connection)
  const advancementLevel = head(await levelRepo.find({ id: lesson.advancementLevelId.toString() }))!
  const progress = head(await repo.findView({ admissionCardNumber, courseId: advancementLevel.courseId.toString() }))
  return progress
}
