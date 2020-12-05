import React, { Component } from 'react';
import { Lesson } from '../entities/lesson';
import { LessonsRepo } from '../repos/lessons-repo';
import { LessonsTable } from './LessonsTable';
import { AppContext } from './AppContext';
import { NewLesson } from './NewLesson';
import { Course } from '../entities/course';
import { LessonsViewRow } from '../generated/row-types';

interface IState {
  viewRows: LessonsViewRow[],
}

interface IProps {
  course: Course,
}

export class LessonsContainer extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new LessonsRepo(this.context.connection)

  state: IState = {
    viewRows: []
  }
  componentDidMount() {
    this.fetchLessons()
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchLessons()
    }
  }

  async addLesson(lesson: Lesson) {
    await this._repository.add(lesson)
    this.fetchLessons()
  }

  fetchLessons() {
    this._repository.findView({ courseId: this.props.course.id.toString() })
      .then(viewRows => this.setState(() => ({ viewRows })))
  }

  render() {
    const { viewRows } = this.state
    return (
      <>
        <NewLesson onCreate={x => this.addLesson(x)} />
        <LessonsTable
          viewRows={viewRows}
          removeLesson={async id => {
            await this._repository.remove(id)
            this.fetchLessons()
          }}
        />
      </>
    );
  }
}
