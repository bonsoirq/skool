import React, { Component, Children } from 'react';
import NewStudent from './new-student';

class StudentsList extends Component {
  state = {
    students: []
  }

  addStudent (student) {
    this.setState(s => ({
      students: [...s.students, student]
    }))
  }

  render() {
    const { students } = this.state
    return (
      <>
        <NewStudent onCreate={x => this.addStudent(x)} />
        <h3>List of students</h3>
        <ol>
          {Children.toArray(students.map((x) => (
            <li>{x.name} {x.lastName}</li>
          )))}
        </ol>
      </>
    );
  }
}

export default StudentsList;
