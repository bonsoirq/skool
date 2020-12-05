import React, { Component } from 'react';
import { Lesson } from '../entities/lesson';
import { LessonsRepo } from '../repos/lessons-repo';
import { LessonsTable } from './LessonsTable';
import { AppContext } from './AppContext';
import { NewLesson } from './NewLesson';
import { LessonAggregate } from '../aggregates/lesson-aggregate';
import { LessonAggregatesRepo } from '../repos/lesson-aggregates-repo';
import { Course } from '../entities/course';

interface IState {
  lessons: LessonAggregate[],
}

interface IProps {
  course: Course,
}

export class LessonsContainer extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new LessonsRepo(this.context.connection)
  private _aggregateRepository = new LessonAggregatesRepo(this.context.connection)

  state: IState = {
    lessons: []
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
    this._aggregateRepository.find({ courseId: this.props.course.id.toString() })
      .then(lessons => this.setState(() => ({ lessons })))
  }

  render() {
    const { lessons } = this.state
    return (
      <>
        <NewLesson onCreate={x => this.addLesson(x)} />
        <LessonsTable
          lessons={lessons}
          removeLesson={async id => {
            await this._repository.remove(id)
            this.fetchLessons()
          }}
        />
      </>
    );
  }
}
