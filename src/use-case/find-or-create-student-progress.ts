import { Connection } from "typeorm"
import { Lesson } from "../entities/lesson"
import { createStudentProgress } from "./create-student-progress"
import { findStudentProgress } from "./find-student-progress"

export const findOrCreateStudentProgress = async (connection: Connection, admissionCardNumber: string, lesson: Lesson) => {
  const progress = await findStudentProgress(connection, admissionCardNumber, lesson)
  if (progress == null) {
    return await createStudentProgress(connection, admissionCardNumber, lesson)
  }
  return progress
}
