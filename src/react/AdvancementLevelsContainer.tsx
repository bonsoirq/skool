import React, { Component } from 'react';
import { AdvancementLevel } from '../entities/advancement-level';
import { Course } from '../entities/course';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { AdvancementLevelsTable } from './AdvancementLevelsTable';
import { AppContext } from './AppContext';
import { NewAdvancementLevel } from './NewAdvancementLevel';

interface IProps {
  course: Course,
}
interface IState {
  advancementLevels: AdvancementLevel[],
}
export class AdvancementLevelsContainer extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new AdvancementLevelsRepo(this.context.connection)

  state: IState = {
    advancementLevels: []
  }
  componentDidMount() {
    this.fetchAdvancementLevels()
  }
  componentDidUpdate() {
    this.fetchAdvancementLevels()
  }
  async addAdvancementLevel(advancementLevel: AdvancementLevel) {
    await this._repository.add(advancementLevel)
    this.fetchAdvancementLevels()
  }

  fetchAdvancementLevels() {
    const { course } = this.props
    this._repository.find({ courseId: course.id.toString() })
      .then(advancementLevels => this.setState(() => ({ advancementLevels })))
  }

  render() {
    const { advancementLevels } = this.state
    const { course } = this.props
    return (
      <>
        <NewAdvancementLevel course={course} onCreate={x => this.addAdvancementLevel(x)} />
        <AdvancementLevelsTable
          advancementLevels={advancementLevels}
          removeAdvancementLevel={async id => {
            await this._repository.remove(id)
            this.fetchAdvancementLevels()
          }}
        />
      </>
    );
  }
}
