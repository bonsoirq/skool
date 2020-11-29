import React from "react";
import { Course } from "../entities/course";

export interface ICourseContext {
  courses: Course[],
  activeCourse: Course | null
}

export const CourseContext = React.createContext<ICourseContext>({
  courses: [],
  activeCourse: null,
})

CourseContext.displayName = 'CourseContext'
