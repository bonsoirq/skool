import React from 'react';
import { AdmissionCard } from '../entities/admission-card';
import { formatDate } from '../util/date';
import { noop } from '../util/function';

interface IProps {
  admissionCards: AdmissionCard[],
}
export function AdmissionCardsTable({ admissionCards }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Number</th>
              <th>Student</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {admissionCards.map((admissionCard, i) => <tr key={admissionCard.number}>
              <td>{i + 1}.</td>
              <td>{admissionCard.number}</td>
              <td>{admissionCard.studentId.toString()}</td>
              <td>{formatDate(admissionCard.createdAt)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

AdmissionCardsTable.defaultProps = {
  admissionCards: [],
  removeStudent: noop
}
