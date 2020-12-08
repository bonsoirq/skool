import React, { useContext } from 'react';
import { AdvancementLevel } from '../entities/advancement-level';
import { moveLevelDown } from '../use-case/move-level-down';
import { moveLevelUp } from '../use-case/move-level-up';
import { head, last } from '../util/array';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';
import { AppContext } from './AppContext';

interface IProps {
  advancementLevels: AdvancementLevel[],
  removeAdvancementLevel(id: UUIDv4): void,
  refresh(): void
}
export function AdvancementLevelsTable({ advancementLevels, removeAdvancementLevel, refresh }: IProps) {
  const context = useContext(AppContext);
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
        <td className="actions">
          <button onClick={() => {
            if (window.confirm(`Do you want to delete ${advancementLevel.name}?`)) {
              removeAdvancementLevel(advancementLevel.id)
            }
          }}>Delete</button>
          <div className="sorting-buttons">
            <button
              disabled={advancementLevel === head(advancementLevels)}
              onClick={async() => {
                await moveLevelUp(context.connection!, advancementLevel)
                refresh()
              }}
            >↑</button>
            <button
              disabled={advancementLevel === last(advancementLevels)}
              onClick={async() => {
                await moveLevelDown(context.connection!, advancementLevel)
                refresh()
              }}
            >↓</button>
          </div>
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
