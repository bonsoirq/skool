export interface IAdmissionCard {
  studentId: string;
  number: string;
}

export function AdmissionCard({
  number,
  studentId,
}: IAdmissionCard): IAdmissionCard {
  return {
    number,
    studentId,
  }
}
