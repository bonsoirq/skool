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
export function GroupsTable({ viewRows, removeGroup }: IProps) {
  return <table>
    <thead>
      <tr>
        <th>l.p.</th>
        <th>Nazwa</th>
        <th>Poziom zaawansowania</th>
        <th>Utworzony</th>
        <th>Akcje</th>
      </tr>
    </thead>
    <tbody>
      {viewRows.map((group, i) => <tr key={group.id}>
        <td>{i + 1}.</td>
        <td>{group.name}</td>
        <td>{group.advancementLevelName}</td>
        <td>{formatDate(SerializeDate.toObject(group.createdAt))}</td>
        <td>
          <button onClick={() => {
            if (window.confirm(`Na pewno chcesz usunąć ${group.name}?`)) {
              removeGroup(UUID(group.id))
            }
          }}>Usuń</button>
        </td>
      </tr>
      )}
    </tbody>
  </table>
}

GroupsTable.defaultProps = {
  viewRows: [],
  removeStudent: noop
}
