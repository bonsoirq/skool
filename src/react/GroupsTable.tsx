import React from 'react';
import { GroupsViewRow } from '../generated/row-types';
import { SerializeDate } from '../serializers/date';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUID, UUIDv4 } from '../values/uuid';

interface IProps {
  viewRows: GroupsViewRow[],
  removeGroup(id: UUIDv4): void,
}
export function GroupsTable({ viewRows, removeGroup }: IProps){
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
            {viewRows.map((group, i) => <tr key={group.id}>
              <td>{i + 1}.</td>
              <td>{group.name}</td>
              <td>{group.advancementLevelName}</td>
              <td>{formatDate(SerializeDate.toObject(group.createdAt))}</td>
              <td>
                <button onClick={() => removeGroup(UUID(group.id))}>Delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

GroupsTable.defaultProps = {
  viewRows: [],
  removeStudent: noop
}
