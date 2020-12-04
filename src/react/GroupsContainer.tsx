import React, { Component } from 'react';
import { Group } from '../entities/group';
import { GroupsRepo } from '../repos/groups-repo';
import { GroupsTable } from './GroupsTable';
import { AppContext } from './AppContext';
import { NewGroup } from './NewGroup';
import { GroupAggregate } from '../aggregates/group-aggregate';
import { GroupAggregatesRepo } from '../repos/group-aggregates-repo';
import { Course } from '../entities/course';

interface IState {
  groups: GroupAggregate[],
}

interface IProps {
  course: Course,
}

export class GroupsContainer extends Component<IProps, IState> {
  static contextType = AppContext
  private _repository = new GroupsRepo(this.context.connection)
  private _aggregateRepository = new GroupAggregatesRepo(this.context.connection)

  state: IState = {
    groups: []
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
    this._aggregateRepository.find({ courseId: this.props.course.id.toString() })
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
