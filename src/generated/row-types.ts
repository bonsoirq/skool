export type AdmissionCardsRow = {
  createdAt: string;
  number: string;
  studentId: string;
}

export type AdmissionCardsViewRow = {
  createdAt: string;
  number: string;
  studentGender: string;
  studentId: string;
  studentLastName: string;
  studentName: string;
  studentPhoneNo: string;
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

export type CourseProgressViewRow = {
  admissionCardNumber: string;
  advancementLevelId: string;
  advancementLevelName: string;
  courseId: string;
  courseName: string;
  createdAt: string;
  groupId: string;
  groupName: string;
  studentGender: string;
  studentId: string;
  studentLastName: string;
  studentName: string;
  studentPhoneNo: string;
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

export type GroupsViewRow = {
  advancementLevelId: string;
  advancementLevelName: string;
  courseId: string;
  courseName: string;
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

export type LessonsViewRow = {
  advancementLevelId: string;
  advancementLevelName: string;
  courseName: string;
  createdAt: string;
  groupId: string;
  groupName: string;
  id: string;
  topic: string;
}

export type PresenceRow = {
  admissionCardNumber: string;
  createdAt: string;
  lessonId: string;
}

export type PresenceViewRow = {
  admissionCardNumber: string;
  advancementLevelId: string;
  advancementLevelName: string;
  courseName: string;
  createdAt: string;
  groupId: string;
  groupName: string;
  lessonId: string;
  lessonTopic: string;
  studentGender: string;
  studentId: string;
  studentLastName: string;
  studentName: string;
  studentPhoneNo: string;
}

export type StudentsRow = {
  createdAt: string;
  gender: string;
  id: string;
  lastName: string;
  name: string;
  phoneNo: string;
}
