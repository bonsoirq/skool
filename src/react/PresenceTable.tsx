import React from 'react';
import { DetailedPresence } from '../repos/presence-repo';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  presence: DetailedPresence[],
  removePresence(admissionCardNumber: string, lessonId: UUIDv4): void,
}
export function PresenceTable({ presence, removePresence }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Student</th>
              <th>Admission Card</th>
              <th>Group</th>
              <th>AdvancementLevel</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {presence.map((x, i) => <tr key={x.admissionCardNumber}>
              <td>{i + 1}.</td>
              <td>{x.studentName}</td>
              <td>{x.admissionCardNumber}</td>
              <td>{x.advancementLevelName}</td>
              <td>{x.groupName}</td>
              <td>{formatDate(x.createdAt)}</td>
              <td>
                <button onClick={() => removePresence(x.admissionCardNumber, x.lessonId)}>Delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

PresenceTable.defaultProps = {
  presence: [],
  removeStudent: noop
}
