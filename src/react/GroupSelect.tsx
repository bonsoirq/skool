import React, { Component } from 'react';
import { Group } from '../entities/group';
import { GroupsRepo } from '../repos/groups-repo';
import { AppContext } from './AppContext';
import { head, isEmptyArray } from '../util/array';
import { noop } from '../util/function';
import { Course } from '../entities/course';

interface IProps {
  onSelect: (group: Group) => void
  course: Course
}

interface IState {
  groups: Group[],
}

export class GroupSelect extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new GroupsRepo(this.context.connection)

  static defaultProps = {
    onSelect: noop
  }

  state: IState = {
    groups: [],
  }

  componentDidMount() {
    this.fetchGroups()
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchGroups()
    }
  }

  fetchGroups() {
    const { course } = this.props
    this._repository.findView({ courseId: course.id.toString() })
      .then(groupViews => {
        const groups = groupViews.map(this._repository.toEntity)
        this.setState(() => ({ groups }))
        if (!isEmptyArray(groups)) {
          const next = head(groups)!
          this.props.onSelect(next)
        }
      })
  }

  render() {
    const { groups } = this.state
    if (isEmptyArray(groups)) {
      return <select
        className="form-field"
        disabled>
        <option>Brak grup</option>
      </select>
    }
    return <select
      className="form-field"
      onChange={e => {
        const next = groups.find(x => x.id.toString() === e.target.value)
        if (next != null) {
          this.props.onSelect(next)
        }
      }}
    >
      {groups.map(x => <option
        value={x.id.toString()}
        key={x.id.toString()}
      >
        {x.name}
      </option>
      )}
    </select>
  }
}
