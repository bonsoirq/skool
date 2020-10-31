interface IPresence {
  studentId: string;
  classId: string;
  attended: boolean;
}

export class Presence implements IPresence{
  readonly studentId: string;
  readonly classId: string;
  public attended: boolean;

  constructor({ studentId, classId, attended }: IPresence) {
    this.studentId = studentId;
    this.classId = classId;
    this.attended = attended;
  }
}
