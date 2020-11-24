export type AdmissionCardsRow = {
  advancementLevelId: string;
  createdAt: string;
  number: string;
  studentId: string;
}

export type AdvancementLevelsRow = {
  createdAt: string;
  id: string;
  name: string;
}

export type StudentsRow = {
  createdAt: string;
  id: string;
  lastName: string;
  name: string;
  phoneNo: string;
}
