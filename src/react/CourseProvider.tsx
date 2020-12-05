import React, { Component } from 'react';
import { Course } from '../entities/course';
import { CoursesRepo } from '../repos/courses-repo';
import { AppContext } from './AppContext';
import { CourseContext, ICourseContext } from './CourseContext';
import { head } from '../util/array';
import { Placeholder } from './Placeholder';
import { CourseSelect } from './CourseSelect';

export class CourseProvider extends Component<any, ICourseContext> {
  static contextType = AppContext
  private _repository = new CoursesRepo(this.context.connection)

  state: ICourseContext = {
    course: null,
    courses: [],
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
      .then(courses => this.setState(() => ({ courses, course: head(courses) })))
  }

  render() {
    const { courses, course } = this.state
    return <>
      Course: <CourseSelect onSelect={course => this.setState(() => ({ course }))} />
      <CourseContext.Provider value={{ courses, course }}>
        {course == null && <Placeholder />}
        {course != null && this.props.children}
      </CourseContext.Provider>
    </>
  }
}
