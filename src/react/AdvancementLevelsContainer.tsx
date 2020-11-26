import React, { Component } from 'react';
import { AdvancementLevel } from '../entities/advancement-level';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { AdvancementLevelsTable } from './AdvancementLevelsTable';
import { AppContext } from './AppContext';
import { NewAdvancementLevel } from './NewAdvancementLevel';

interface IState {
  advancementLevels: AdvancementLevel[],
}
export class AdvancementLevelsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new AdvancementLevelsRepo(this.context.connection)

  state: IState = {
    advancementLevels: []
  }
  componentDidMount() {
    this.fetchAdvancementLevels()
  }
  async addAdvancementLevel(advancementLevel: AdvancementLevel) {
    await this._repository.add(advancementLevel)
    this.fetchAdvancementLevels()
  }

  fetchAdvancementLevels() {
    this._repository.all()
      .then(advancementLevels => this.setState(() => ({ advancementLevels })))
  }

  render() {
    const { advancementLevels } = this.state
    return (
      <>
        <NewAdvancementLevel onCreate={x => this.addAdvancementLevel(x)} />
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
