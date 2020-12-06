import { Connection } from "typeorm"
import { buildCourseProgress } from "../entities/course-progress"
import { Lesson } from "../entities/lesson"
import { AdvancementLevelsRepo } from "../repos/advancement-levels-repo"
import { CourseProgressRepo } from "../repos/course-progress-repo"
import { head } from "../util/array"

export const createStudentProgress = async (connection: Connection, admissionCardNumber: string, lesson: Lesson) => {
  const repo = new CourseProgressRepo(connection)
  const levelRepo = new AdvancementLevelsRepo(connection)
  const advancementLevel = head(await levelRepo.find({ id: lesson.advancementLevelId.toString() }))!
  const progress = buildCourseProgress({
    admissionCardNumber,
    advancementLevelId: advancementLevel.id,
    courseId: advancementLevel.courseId,
    groupId: lesson.groupId,
  })
  await repo.add(progress)
  return head(await repo.findView({ admissionCardNumber, courseId: advancementLevel.courseId.toString() }))!
}
