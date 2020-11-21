import React, { Component } from 'react';
import { IStudent } from '../entities/student';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import NewStudent from './new-student';

interface IState {
  students: IStudent[],
}
class StudentsList extends Component<any, IState> {
  static contextType = AppContext
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

  get _repository () {
    return new StudentsRepo(this.context.connection)
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
        <h3>List of students</h3>
        <ol>
          {students.map(x => <li key={x.id.toString()}>{x.name} {x.lastName} ({x.phoneNo.toString()})
            <button onClick={async () => {
              await this._repository.remove(x.id)
              this.fetchStudents()
            }}>Delete</button>
          </li>)}
        </ol>
      </>
    );
  }
}

export default StudentsList;
