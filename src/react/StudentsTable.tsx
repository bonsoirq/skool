import React from 'react';
import { Link } from 'react-router-dom';
import { Student } from '../entities/student';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  students: Student[],
  removeStudent: (id: UUIDv4) => void
}
export function StudentsTable({ students, removeStudent }: IProps) {
  return <table>
    <thead>
      <tr>
        <th>l.p.</th>
        <th>Nazwa</th>
        <th>Płeć</th>
        <th>Telefon</th>
        <th>Data rejestracji</th>
        <th>Akcje</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student, i) => <tr key={student.id.toString()}>
        <td>{i + 1}.</td>
        <td>{student.name} {student.lastName}</td>
        <td>{student.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td>
        <td>{student.phoneNo.formattedString()}</td>
        <td>{formatDate(student.createdAt)}</td>
        <td>
          <button onClick={() => {
            if (window.confirm(`Na pewno chcesz usunąć ${student.name} ${student.lastName}?`)) {
              removeStudent(student.id)
            }
          }}>Usuń</button>
          <Link to={`/Students/${student.id.toString()}`}>
            <button>Szczegóły</button>
          </Link>
        </td>
      </tr>
      )}
    </tbody>
  </table>
}

StudentsTable.defaultProps = {
  students: [],
  removeStudent: noop
}
