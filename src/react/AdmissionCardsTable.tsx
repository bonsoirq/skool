import React from 'react';
import { AdmissionCardsViewRow } from '../generated/row-types';
import { SerializeDate } from '../serializers/date';
import { formatDate } from '../util/date';
import { noop } from '../util/function';

interface IProps {
  viewRows: AdmissionCardsViewRow[],
}
export function AdmissionCardsTable({ viewRows }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>l.p.</th>
              <th>Numer</th>
              <th>Kursant</th>
              <th>Data rejestracji</th>
            </tr>
          </thead>
          <tbody>
            {viewRows.map((x, i) => <tr key={x.number}>
              <td>{i + 1}.</td>
              <td>{x.number}</td>
              <td>{x.studentName} {x.studentLastName}</td>
              <td>{formatDate(SerializeDate.toObject(x.createdAt))}</td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

AdmissionCardsTable.defaultProps = {
  viewRows: [],
  removeStudent: noop
}
