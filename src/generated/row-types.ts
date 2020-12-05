export type AdmissionCardsRow = {
  createdAt: string;
  number: string;
  studentId: string;
}

export type AdvancementLevelsRow = {
  courseId: string;
  createdAt: string;
  id: string;
  name: string;
}

export type CourseProgressRow = {
  admissionCardNumber: string;
  advancementLevelId: string;
  courseId: string;
  createdAt: string;
  groupId: string;
}

export type CoursesRow = {
  createdAt: string;
  id: string;
  name: string;
}

export type GroupsRow = {
  advancementLevelId: string;
  createdAt: string;
  id: string;
  name: string;
}

export type LessonsRow = {
  advancementLevelId: string;
  createdAt: string;
  groupId: string;
  id: string;
  topic: string;
}

export type PresenceRow = {
  admissionCardNumber: string;
  createdAt: string;
  lessonId: string;
}

export type StudentsRow = {
  createdAt: string;
  gender: string;
  id: string;
  lastName: string;
  name: string;
  phoneNo: string;
}
