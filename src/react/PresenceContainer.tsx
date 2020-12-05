import React, { Component } from 'react';
import { Presence } from '../entities/presence';
import { DetailedPresence, PresenceRepo } from '../repos/presence-repo';
// import { PresencesTable } from './PresencesTable';
import { AppContext } from './AppContext';
// import { NewPresence } from './NewPresence';
// import { PresenceAggregate } from '../aggregates/presence-aggregate';
// import { PresenceAggregatesRepo } from '../repos/presence-aggregates-repo';
import { Course } from '../entities/course';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Lesson } from '../entities/lesson';
import { head } from '../util/array';
import { LessonsRepo } from '../repos/lessons-repo';
import { NewPresence } from './NewPresence';
import { PresenceTable } from './PresenceTable';

interface IState {
  presence: DetailedPresence[],
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
  // private _aggregateRepository = new PresenceAggregatesRepo(this.context.connection)

  state: IState = {
    presence: [],
    lesson: null,
  }
  async componentDidMount() {
    const lessonId = this.props.match.params.id
    const lesson = head(await this._lessonRepository.find({ 'Lessons.id': lessonId }))!
    this.setState(() => ({ lesson }), () => {
      this.fetchPresences()
    })
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchPresences()
    }
  }

  async addPresence(presence: Presence) {
    await this._repository.add(presence)
    this.fetchPresences()
  }

  fetchPresences() {
    this._repository.findDetailed({ courseId: this.props.course.id.toString() })
      .then(presence => this.setState(() => ({ presence })))
  }

  render() {
    const { lesson, presence } = this.state
    if (lesson == null) return null
    return (
      <>
        <NewPresence lesson={lesson} onCreate={x => this.addPresence(x)} />
        <PresenceTable
          presence={presence}
          removePresence={async (admissionCardNumber, lessonId) => {
            await this._repository.remove(admissionCardNumber, lessonId)
            this.fetchPresences()
          }}
        />
      </>
    );
  }
}

export const PresenceContainer = withRouter(UndecoratedPresenceContainer)
