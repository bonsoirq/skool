interface IAdmissionCard {
  studentId: string;
  number: string;
}

export class AdmissionCard implements IAdmissionCard {
  readonly studentId: string;
  readonly number: string;

  constructor({ studentId, number }: IAdmissionCard) {
    this.studentId = studentId;
    this.number = number;
  }
}
