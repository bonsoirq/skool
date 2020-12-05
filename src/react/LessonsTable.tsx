import React from 'react';
import { Link } from 'react-router-dom';
import { LessonAggregate } from '../aggregates/lesson-aggregate';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUIDv4 } from '../values/uuid';

interface IProps {
  lessons: LessonAggregate[],
  removeLesson(id: UUIDv4): void,
}

export function LessonsTable({ lessons, removeLesson }: IProps){
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>Topic</th>
              <th>Group</th>
              <th>AdvancementLevel</th>
              <th>Created</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, i) => <tr key={lesson.id.toString()}>
              <td>{i + 1}.</td>
              <td>{lesson.topic}</td>
              <td>{lesson.group.name}</td>
              <td>{lesson.advancementLevel.name}</td>
              <td>{formatDate(lesson.createdAt)}</td>
              <td>
                <button onClick={() => removeLesson(lesson.id)}>Delete</button>
              </td>
              <td>
                <Link to={`/Lessons/${lesson.id.toString()}/Presence`}>
                  <button>Check presence</button>
                </Link>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </>
    );
}

LessonsTable.defaultProps = {
  lessons: [],
  removeStudent: noop
}
