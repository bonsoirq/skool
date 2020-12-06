import React, { Component } from 'react';
import { AdvancementLevel } from '../entities/advancement-level';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { AppContext } from './AppContext';
import { head, isEmptyArray } from '../util/array';
import { noop } from '../util/function';
import { Course } from '../entities/course';

interface IProps {
  onSelect: (advancementlevel: AdvancementLevel) => void
  course: Course
}

interface IState {
  advancementlevels: AdvancementLevel[],
}

export class AdvancementLevelSelect extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new AdvancementLevelsRepo(this.context.connection)

  static defaultProps = {
    onSelect: noop
  }

  state: IState = {
    advancementlevels: [],
  }

  componentDidMount() {
    this.fetchAdvancementLevels()
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchAdvancementLevels()
    }
  }

  fetchAdvancementLevels() {
    const { course } = this.props
    this._repository.find({ courseId: course.id.toString() })
      .then(advancementlevels => {
        this.setState(() => ({ advancementlevels }))
        if (!isEmptyArray(advancementlevels)) {
          const next = head(advancementlevels)!
          this.props.onSelect(next)
        }
      })
  }

  render() {
    const { advancementlevels } = this.state
    if (isEmptyArray(advancementlevels)) {
      return <select disabled>
        <option>No advancement levels available</option>
      </select>
    }
    return <select
      className="form-field"
      onChange={e => {
        const next = advancementlevels.find(x => x.id.toString() === e.target.value)
        if (next != null) {
          this.props.onSelect(next)
        }
      }}
    >
      {advancementlevels.map(x => <option
        value={x.id.toString()}
        key={x.id.toString()}
      >
        {x.name}
      </option>
      )}
    </select>
  }
}
