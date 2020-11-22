import React, { Component } from 'react';
import { IStudent } from '../entities/student';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import NewStudent from './new-student';
import StudentsList from './students-list';

interface IState {
  students: IStudent[],
}
class StudentsListContainer extends Component<any, IState> {
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
        <StudentsList
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

export default StudentsListContainer;
