import React from "react";
import { Course } from "../entities/course";

export interface ICourseContext {
  courses: Course[],
  course: Course | null
}

export const CourseContext = React.createContext<ICourseContext>({
  courses: [],
  course: null,
})

CourseContext.displayName = 'CourseContext'
