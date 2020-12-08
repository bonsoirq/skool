import React, { Component } from 'react';
import { Group } from '../entities/group';
import { GroupsRepo } from '../repos/groups-repo';
import { GroupsTable } from './GroupsTable';
import { AppContext } from './AppContext';
import { NewGroup } from './NewGroup';
import { GroupAggregatesRepo } from '../repos/group-aggregates-repo';
import { Course } from '../entities/course';
import { GroupsViewRow } from '../generated/row-types';

interface IState {
  viewRows: GroupsViewRow[],
}

interface IProps {
  course: Course,
}

export class GroupsContainer extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new GroupsRepo(this.context.connection)
  private _aggregateRepository = new GroupAggregatesRepo(this.context.connection)

  state: IState = {
    viewRows: []
  }
  componentDidMount() {
    this.fetchGroups()
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.course !== this.props.course) {
      this.fetchGroups()
    }
  }

  async addGroup(group: Group) {
    await this._repository.add(group)
    this.fetchGroups()
  }

  fetchGroups() {
    this._repository.findView({ courseId: this.props.course.id.toString() })
      .then(viewRows => this.setState(() => ({ viewRows })))
  }

  render() {
    const { viewRows } = this.state
    return (
      <>
        <NewGroup onCreate={x => this.addGroup(x)} />
        <GroupsTable
          viewRows={viewRows}
          removeGroup={async id => {
            await this._repository.remove(id)
            this.fetchGroups()
          }}
        />
      </>
    );
  }
}
