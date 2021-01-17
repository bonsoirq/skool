import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { Group } from '../entities/group';
import { Form } from './components/Form';
import { AdvancementLevel } from '../entities/advancement-level';
import { isNullish } from '../util/function';
import { buildPresence, Presence } from '../entities/presence';
import { Lesson } from '../entities/lesson';
import { NUMBER_DIGIT_COUNT } from '../entities/admission-card';
import { AppContext } from './AppContext';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { PresenceRepo } from '../repos/presence-repo';
import { head } from '../util/array';
import { findOrCreateStudentProgress } from '../use-case/find-or-create-student-progress';
import { UUID } from '../values/uuid';

interface IProps {
  onCreate: (presence: Presence) => void
  lesson: Lesson
}

interface IState {
  advancementLevel: AdvancementLevel | null
  group: Group | null
}

export class NewPresence extends Component<IProps, IState> {
  state: IState = {
    advancementLevel: null,
    group: null,
  }
  static contextType = AppContext
  _repo = new PresenceRepo(this.context.connection)
  _cardRepo = new AdmissionCardsRepo(this.context.connection)
  render() {
    return <Form
      initialValues={{ admissionCardNumber: '' }}
      validations={this.validations}
    >
      {({
        values,
        errors,
        isValid,
        handleInputBlur,
        handleInputChange,
        handleInputFocus,
        restoreInitialValues,
        handleSubmit,
        setValues,
      }) =>
        <>
          <h3>Nowa obecność | {this.props.lesson.topic}</h3>
          <form className="form-inline" action="" onSubmit={e => {
            handleSubmit(e, async () => {
              const { admissionCardNumber } = values
              const { lesson } = this.props
              const courseProgressView = await findOrCreateStudentProgress(
                this.context.connection,
                admissionCardNumber,
                lesson,
                )
              const presence = buildPresence({
                admissionCardNumber,
                studentAdvancementLevelId: UUID(courseProgressView.advancementLevelId),
                studentAdvancementLevelName: courseProgressView.advancementLevelName,
                studentGroupId: UUID(courseProgressView.groupId),
                studentGroupName: courseProgressView.groupName,
                lessonId: lesson.id
              })
              this.props.onCreate(presence)
              restoreInitialValues()
            })
          }}>
            <label>
              <span className="form-label">Numer karnetu:</span>
              <input
                className="form-field"
                name="admissionCardNumber"
                type="text"
                maxLength={NUMBER_DIGIT_COUNT}
                value={values.admissionCardNumber}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <span className="error-message">{errors.admissionCardNumber}</span>
            </label>
            <input
              className="form-field"
              type="button"
              value="Wypełnij zera wiodące"
              onClick={() => {
              setValues(v => ({ admissionCardNumber: v.admissionCardNumber.padStart(NUMBER_DIGIT_COUNT, '0')}))
            }} />
            <input
              className="form-field"
              type="submit"
              value="Utwórz"
              disabled={!isValid}
            />
          </form>
        </>
      }
    </Form>
  }

  validations = {
    admissionCardNumber: async (number: string) => {
      const { lesson } = this.props
      if (isBlank(number)) return 'Wymagane'
      if (isNullish(await this._cardRepo.findByNumber(number))) return 'Nie ma takiego karnetu'
      if (!isNullish(head(await this._repo.find({ lessonId: lesson.id.toString(), admissionCardNumber: number })))) return 'Obecność już odnotowana'
    }
  }
}
