import React, { Component } from 'react';
import { IStudent } from '../entities/student';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { NewStudent } from './NewStudent';
import { StudentsTable } from './StudentsTable';

interface IState {
  students: IStudent[],
}
export class StudentsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new StudentsRepo(this.context.connection)

  state: IState = {
    students: []
  }
  componentDidMount () {
    this.fetchStudents()
  }
  async addStudent (student: IStudent) {
    await this._repository.add(student)
    this.fetchStudents()
  }

  fetchStudents () {
    this._repository.all()
      .then(students => this.setState(() => ({ students })))
  }

  render() {
    const { students } = this.state
    return (
      <>
        <NewStudent onCreate={x => this.addStudent(x)} />
        <StudentsTable
          students={students}
          removeStudent={async id => {
            await this._repository.remove(id)
            this.fetchStudents()
          }}
        />
      </>
    );
  }
}
