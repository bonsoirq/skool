interface ILesson {
  id: string;
  topic: string;
  startsAt: Date;
  endsAt: Date;
  teacherId: string;
}

export class Lesson implements ILesson {
  readonly id: string;
  public topic: string;
  public startsAt: Date;
  public endsAt: Date;
  public teacherId: string;

  constructor({ id, topic, startsAt, endsAt, teacherId }: ILesson) {
    this.id = id;
    this.topic = topic;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.teacherId = teacherId;
  }
}
