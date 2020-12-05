import React from 'react';
import { GroupAggregate } from '../aggregates/group-aggregate';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  groups: GroupAggregate[],
  removeGroup(id: UUIDv4): void,
}
export function GroupsTable({ groups, removeGroup }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Name</th>
              <th>AdvancementLevel</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, i) => <tr key={group.id.toString()}>
              <td>{i + 1}.</td>
              <td>{group.name}</td>
              <td>{group.advancementLevel.name}</td>
              <td>{formatDate(group.createdAt)}</td>
              <td>
                <button onClick={() => removeGroup(group.id)}>Delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

GroupsTable.defaultProps = {
  groups: [],
  removeStudent: noop
}
