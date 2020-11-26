import React from 'react';
import { Student } from '../entities/student';
interface IProps {
  student: Student | null
}
export function StudentName ({ student }: IProps) {
  if (student == null) return null
  return <>{student.name} {student.lastName}</>
}
