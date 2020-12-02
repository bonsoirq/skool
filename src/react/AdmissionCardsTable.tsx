import React from 'react';
import { AdmissionCardAggregate } from '../aggregates/admission-card-aggregate';
import { AdmissionCard } from '../entities/admission-card';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { StudentName } from './StudentName';

interface IProps {
  admissionCardAggregates: AdmissionCardAggregate[],
}
export function AdmissionCardsTable({ admissionCardAggregates }: IProps){
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
            {admissionCardAggregates.map((x, i) => <tr key={x.number}>
              <td>{i + 1}.</td>
              <td>{x.number}</td>
              <td><StudentName student={x.student} /></td>
              <td>{formatDate(x.createdAt)}</td>
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
