interface IStudent {
  id: string;
  name: string;
  lastName: string;
  groupId: string;
}

export class Student implements IStudent {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly groupId: string;

  constructor({ id, name, lastName, groupId }: IStudent) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.groupId = groupId;
  }
}
