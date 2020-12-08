import React from 'react';
import { AdvancementLevel } from '../entities/advancement-level';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  advancementLevels: AdvancementLevel[],
  removeAdvancementLevel(id: UUIDv4): void,
}
export function AdvancementLevelsTable({ advancementLevels, removeAdvancementLevel }: IProps) {
  return <table>
    <thead>
      <tr>
        <th>no.</th>
        <th>Name</th>
        <th>Created</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {advancementLevels.map((advancementLevel, i) => <tr key={advancementLevel.id.toString()}>
        <td>{i + 1}.</td>
        <td>{advancementLevel.name}</td>
        <td>{formatDate(advancementLevel.createdAt)}</td>
        <td>
          <button onClick={() => {
            if (window.confirm(`Do you want to delete ${advancementLevel.name}?`)) {
              removeAdvancementLevel(advancementLevel.id)
            }
          }}>Delete</button>
        </td>
      </tr>
      )}
    </tbody>
  </table>
}

AdvancementLevelsTable.defaultProps = {
  advancementLevels: [],
  removeStudent: noop
}
