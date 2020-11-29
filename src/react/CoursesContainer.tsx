import React, { Component } from 'react';
import { Course } from '../entities/course';
import { CoursesRepo } from '../repos/courses-repo';
import { CoursesTable } from './CoursesTable';
import { AppContext } from './AppContext';
import { NewCourse } from './NewCourse';

interface IState {
  courses: Course[],
}

export class CoursesContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new CoursesRepo(this.context.connection)

  state: IState = {
    courses: []
  }
  componentDidMount() {
    this.fetchCourses()
  }
  async addCourse(course: Course) {
    await this._repository.add(course)
    this.fetchCourses()
  }

  fetchCourses() {
    this._repository.all()
      .then(courses => this.setState(() => ({ courses })))
  }

  render() {
    const { courses } = this.state
    return (
      <>
        <NewCourse onCreate={x => this.addCourse(x)} />
        <CoursesTable
          courses={courses}
          removeCourse={async id => {
            await this._repository.remove(id)
            this.fetchCourses()
          }}
        />
      </>
    );
  }
}
