import React from 'react';
import { PresenceViewRow } from '../generated/row-types';
import { SerializeDate } from '../serializers/date';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUID, UUIDv4 } from '../values/uuid';

interface IProps {
  viewRows: PresenceViewRow[],
  removePresence(admissionCardNumber: string, lessonId: UUIDv4): void,
}
export function PresenceTable({ viewRows, removePresence }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Student</th>
              <th>Admission Card</th>
              <th>AdvancementLevel</th>
              <th>Group</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewRows.map((x, i) => <tr key={x.admissionCardNumber}>
              <td>{i + 1}.</td>
              <td>{x.studentName} {x.studentLastName}</td>
              <td>{x.admissionCardNumber}</td>
              <td>{x.studentAdvancementLevelName}</td>
              <td>{x.studentGroupName}</td>
              <td>{formatDate(SerializeDate.toObject(x.createdAt))}</td>
              <td>
                <button onClick={() => removePresence(x.admissionCardNumber, UUID(x.lessonId))}>Delete</button>
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
