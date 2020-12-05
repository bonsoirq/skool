import React from 'react';
import { Link } from 'react-router-dom';
import { LessonAggregate } from '../aggregates/lesson-aggregate';
import { LessonsViewRow } from '../generated/row-types';
import { SerializeDate } from '../serializers/date';
import { formatDate } from '../util/date';
import { noop } from '../util/function';
import { UUID, UUIDv4 } from '../values/uuid';

interface IProps {
  viewRows: LessonsViewRow[],
  removeLesson(id: UUIDv4): void,
}

export function LessonsTable({ viewRows, removeLesson }: IProps){
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
            {viewRows.map((lesson, i) => <tr key={lesson.id}>
              <td>{i + 1}.</td>
              <td>{lesson.topic}</td>
              <td>{lesson.groupName}</td>
              <td>{lesson.advancementLevelName}</td>
              <td>{formatDate(SerializeDate.toObject(lesson.createdAt))}</td>
              <td>
                <button onClick={() => removeLesson(UUID(lesson.id))}>Delete</button>
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
