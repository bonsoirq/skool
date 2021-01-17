import React, { Component, useContext, useEffect, useState } from 'react';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { head } from '../util/array';
import { LessonsRepo } from '../repos/lessons-repo';
import { CourseProgressRepo } from '../repos/course-progress-repo';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { Student } from '../entities/student';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { AdmissionCard } from '../entities/admission-card';
import { CourseProgressViewRow } from '../generated/row-types';
import { SerializeDate } from '../serializers/date';


interface IProps {
  match?: {
    params: {
      id: string
    }
  }
}

function UndecoratedStudentDetails(props: IProps & RouteComponentProps) {
  const context = useContext(AppContext)
  const _repository = new StudentsRepo(context.connection!)
  const _admissionCardsRepository = new AdmissionCardsRepo(context.connection!)
  const _progressRepository = new CourseProgressRepo(context.connection!)

  const [student, setStudent] = useState<Student | null>(null);
  const [cards, setCards] = useState<AdmissionCard[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgressViewRow[]>([]);

  useEffect(() => {
    (async () => {
      const studentId = props.match.params.id
      const student = head(await _repository.find({ id: studentId }))!
      const courseProgress = await _progressRepository.findView({ studentId: student.id.toString() })
      const admisionCards = await _admissionCardsRepository.find({ studentId: student.id.toString() })
      setStudent(student)
      setCards(admisionCards)
      setCourseProgress(courseProgress)
    })()
  }, []);

  if (student == null) return null
  return (
    <div className="StudentDetails">
      <h1>{student.name} {student.lastName}</h1>
      <p>Telefon: {student.phoneNo.toString()}</p>
      <p>Data rejestracji: {student.createdAt.toLocaleDateString()}</p>

      <h2>Karnety</h2>
      {cards.map(x => <div key={x.number}>
        <p>
          Numer: {x.number}
        </p>
        <p>
          Data rejestracji: {x.createdAt.toLocaleDateString()}
        </p>
      </div>)}
      <h2> Postępy w kursach</h2>
      {courseProgress.map(x => <div key={x.courseId}>
        <b>
          <p>
            Nazwa kursu: {x.courseName}
          </p>
        </b>
        <p>
          Numer karnetu: {x.admissionCardNumber}
        </p>
        <p>
          Poziom zaawansowania: {x.advancementLevelName}
        </p>
        <p>
          Grupa zajęciowa: {x.groupName}
        </p>
        <p>
          Data rozpoczęcia: {SerializeDate.toObject(x.createdAt).toLocaleDateString()}
        </p>
      </div>)}
    </div>
  );
}

export const StudentDetails = withRouter(UndecoratedStudentDetails)
