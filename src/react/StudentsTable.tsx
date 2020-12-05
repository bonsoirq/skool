import React from 'react';
import { Student } from '../entities/student';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  students: Student[],
  removeStudent: (id: UUIDv4) => void
}
export function StudentsTable({ students, removeStudent }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => <tr key={student.id.toString()}>
              <td>{i + 1}.</td>
              <td>{student.name} {student.lastName}</td>
              <td>{student.gender === 'male' ? 'Male' : 'Female'}</td>
              <td>{student.phoneNo.formattedString()}</td>
              <td>{formatDate(student.createdAt)}</td>
              <td>
                <button onClick={() => removeStudent(student.id)}>Delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

StudentsTable.defaultProps = {
  students: [],
  removeStudent: noop
}
