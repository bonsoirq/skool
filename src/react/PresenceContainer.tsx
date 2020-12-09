import React, { Component } from 'react';
import { Presence } from '../entities/presence';
import { PresenceRepo } from '../repos/presence-repo';
import { AppContext } from './AppContext';
import { Course } from '../entities/course';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Lesson } from '../entities/lesson';
import { head } from '../util/array';
import { LessonsRepo } from '../repos/lessons-repo';
import { NewPresence } from './NewPresence';
import { PresenceTable } from './PresenceTable';
import { CourseProgressRepo } from '../repos/course-progress-repo';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { buildCourseProgress } from '../entities/course-progress';
import { CourseProgressViewRow, PresenceViewRow } from '../generated/row-types';

interface IState {
  viewRows: PresenceViewRow[],
  lessonGroupMembers: CourseProgressViewRow[],
  lesson: Lesson | null
}

interface IProps {
  course: Course,
  match?: {
    params: {
      id: string
    }
  }
}

class UndecoratedPresenceContainer extends Component<IProps & RouteComponentProps, IState> {
  static contextType = AppContext
  private _repository = new PresenceRepo(this.context.connection)
  private _lessonRepository = new LessonsRepo(this.context.connection)
  private _levelRepository = new AdvancementLevelsRepo(this.context.connection)
  private _progressRepository = new CourseProgressRepo(this.context.connection)

  state: IState = {
    viewRows: [],
    lessonGroupMembers: [],
    lesson: null,
  }
  async componentDidMount() {
    const lessonId = this.props.match.params.id
    const lesson = head(await this._lessonRepository.find({ id: lessonId }))!
    const lessonGroupMembers = await this._progressRepository.findView({ groupId: lesson.groupId.toString() })
    this.setState(() => ({ lesson, lessonGroupMembers }), () => {
      this.fetchPresences()
    })
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchPresences()
    }
  }

  async addPresence(presence: Presence) {
    const lesson = this.state.lesson!
    const advancementLevel = head(await this._levelRepository.find({ id: lesson.advancementLevelId }))!
    await this._repository.add(presence)
    if(head(await this._progressRepository.find({
        admissionCardNumber: presence.admissionCardNumber,
        courseId: advancementLevel.courseId.toString()})
      ) == null) {
      const courseProgress = buildCourseProgress({
        admissionCardNumber: presence.admissionCardNumber,
        courseId: advancementLevel.courseId,
        advancementLevelId: advancementLevel.id,
        groupId: lesson.groupId,
      })
      await this._progressRepository.add(courseProgress)
    }
    this.fetchPresences()
  }

  fetchPresences() {
    this._repository.findView({ lessonId: this.state.lesson?.id.toString() })
      .then(viewRows => this.setState(() => ({ viewRows })))
  }

  get numberOfMen () {
    return this.state.viewRows.filter(x => x.studentGender === 'male').length
  }

  get numberOfLadies () {
    return this.state.viewRows.filter(x => x.studentGender === 'female').length
  }

  get numberOfAdditionalMembers () {
    const { lesson, viewRows } = this.state
    return viewRows.filter(x => x.studentAdvancementLevelId !== lesson!.advancementLevelId.toString()).length
  }

  get regularMembersPresence () {
    const { viewRows, lessonGroupMembers } = this.state
    return Math.ceil((viewRows.length - this.numberOfAdditionalMembers) / lessonGroupMembers.length * 100)
  }

  get regularMembersNumber () {
    const { lessonGroupMembers } = this.state
    return lessonGroupMembers.length
  }

  render() {
    const { lesson, viewRows } = this.state
    if (lesson == null) return null
    return (
      <div className="PresenceContainer">
        <div className="summary-row">
          <NewPresence lesson={lesson} onCreate={x => this.addPresence(x)} />
          <div className="summary-card">
            <div><span className="form-label">Gentlemen:</span> {this.numberOfMen}</div>
            <div><span className="form-label">Ladies:</span> {this.numberOfLadies}</div>
            <div><span className="form-label">Presence:</span> {viewRows.length} / {this.regularMembersNumber} ({this.regularMembersPresence}%)</div>
          </div>
        </div>
        <PresenceTable
          viewRows={viewRows}
          removePresence={async (admissionCardNumber, lessonId) => {
            await this._repository.remove(admissionCardNumber, lessonId)
            this.fetchPresences()
          }}
        />
      </div>
    );
  }
}

export const PresenceContainer = withRouter(UndecoratedPresenceContainer)
