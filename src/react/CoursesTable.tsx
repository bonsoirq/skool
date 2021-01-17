import React from 'react';
import { Course } from '../entities/course';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  courses: Course[],
  removeCourse(id: UUIDv4): void,
}
export function CoursesTable({ courses, removeCourse }: IProps) {
  return <table>
    <thead>
      <tr>
        <th>l.p.</th>
        <th>Nazwa</th>
        <th>Utworzony</th>
        <th>Akcje</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course, i) => <tr key={course.id.toString()}>
        <td>{i + 1}.</td>
        <td>{course.name}</td>
        <td>{formatDate(course.createdAt)}</td>
        <td>
          <button onClick={() => {
            if (window.confirm(`Na pewno chcesz usunąć ${course.name}?`)) {
              removeCourse(course.id)
            }
          }}>Usuń</button>
        </td>
      </tr>
      )}
    </tbody>
  </table>
}

CoursesTable.defaultProps = {
  courses: [],
  removeStudent: noop
}
