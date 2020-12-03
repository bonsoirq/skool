import React, { Component } from 'react';
import { Group } from '../entities/group';
import { GroupsRepo } from '../repos/groups-repo';
import { GroupsTable } from './GroupsTable';
import { AppContext } from './AppContext';
import { NewGroup } from './NewGroup';

interface IState {
  groups: Group[],
}

export class GroupsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new GroupsRepo(this.context.connection)

  state: IState = {
    groups: []
  }
  componentDidMount() {
    this.fetchGroups()
  }
  async addGroup(group: Group) {
    await this._repository.add(group)
    this.fetchGroups()
  }

  fetchGroups() {
    this._repository.find()
      .then(groups => this.setState(() => ({ groups })))
  }

  render() {
    const { groups } = this.state
    return (
      <>
        <NewGroup onCreate={x => this.addGroup(x)} />
        <GroupsTable
          groups={groups}
          removeGroup={async id => {
            await this._repository.remove(id)
            this.fetchGroups()
          }}
        />
      </>
    );
  }
}
