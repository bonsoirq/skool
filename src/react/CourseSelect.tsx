import React, { Component } from 'react';
import { Course } from '../entities/course';
import { CoursesRepo } from '../repos/courses-repo';
import { AppContext } from './AppContext';
import { head, isEmptyArray } from '../util/array';
import { noop } from '../util/function';

interface IProps {
  onSelect: (course: Course) => void
  name?: string
}

interface IState {
  courses: Course[],
}
export class CourseSelect extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new CoursesRepo(this.context.connection)

  static defaultProps: IProps = {
    onSelect: noop
  }

  state: IState = {
    courses: []
  }

  componentDidMount() {
    this.fetchCourses()
  }

  fetchCourses() {
    this._repository.all()
      .then(courses => {
        this.setState(() => ({ courses }))
        if (!isEmptyArray(courses)) {
          this.props.onSelect(head(courses)!)
        }
      })
  }

  render() {
    const { courses } = this.state
    if (isEmptyArray(courses)) {
      return <select disabled>
        <option>Brak kursów</option>
      </select>
    }
    return <select
      className="form-field"
      name={this.props.name}
      onChange={e => {
        const course = courses.find(x => x.id.toString() === e.target.value)
        if (course != null) {
          this.props.onSelect(course)
        }
      }}
    >
      {courses.map(x => <option
        value={x.id.toString()}
        key={x.id.toString()}
        onClick={() => this.props.onSelect(x)}
      >
        {x.name}
      </option>
      )}
    </select>
  }
}
