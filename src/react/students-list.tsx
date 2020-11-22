import React from 'react';
import { IStudent } from '../entities/student';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  students: IStudent[],
  removeStudent: (id: UUIDv4) => void
}
export function StudentsList({ students, removeStudent }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => <tr key={student.id.toString()}>
              <td>{i + 1}.</td>
              <td>{student.name} {student.lastName}</td>
              <td>{student.phoneNo.formattedString()}</td>
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

StudentsList.defaultProps = {
  students: [],
  removeStudent: noop
}

export default StudentsList;
