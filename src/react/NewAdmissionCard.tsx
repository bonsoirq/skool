import React, { Component } from 'react';
import { isBlank, isDigit, toArray } from '../util/string';
import { buildAdmissionCard, AdmissionCard, NUMBER_DIGIT_COUNT } from '../entities/admission-card';
import { Student } from '../entities/student';
import { AdvancementLevel } from '../entities/advancement-level';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { head } from '../util/list';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { StudentAutocomplete } from './StudentAutocomplete';
import { Form } from './components/Form';

interface IProps {
  onCreate: (admisionCard: AdmissionCard) => void
}

interface IState {
  student: Student | null,
  advancementLevel: AdvancementLevel | null,
  advancementLevels: AdvancementLevel[],
}

export class NewAdmissionCard extends Component<IProps, IState> {
  state: IState = NewAdmissionCard.initialState
  static contextType = AppContext
  _studentsRepo = new StudentsRepo(this.context.connection)
  _advancementLevelsRepo = new AdvancementLevelsRepo(this.context.connection)

  static get initialState() {
    return {
      student: null,
      advancementLevel: null,
      advancementLevels: [],
      values: {
        studentSearch: '',
        number: '',
      },
      errors: {
        number: null,
      },
    }
  }

  componentDidMount() {
    this._advancementLevelsRepo
      .all()
      .then(advancementLevels => this.setState(() => ({ advancementLevels, advancementLevel: head(advancementLevels) })))
  }

  render() {
    const { student, advancementLevel, advancementLevels } = this.state
    return <Form
      initialValues={{ number: '' }}
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
      }) =>
        <>
          <h3>Add an admissionCard</h3>
          <form action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { number } = values
              if (student != null && advancementLevel != null) {
                const admissionCard = buildAdmissionCard({ number, studentId: student.id, advancementLevelId: advancementLevel.id })
                this.props.onCreate(admissionCard)
                restoreInitialValues()
              }
            })
          }}>
            <label htmlFor="number">
              Number:
              <input
                name="number"
                type="text"
                maxLength={NUMBER_DIGIT_COUNT}
                value={values.number}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </label>
            {errors.number}
            <StudentAutocomplete
              onSelect={(student: Student) => this.setState({ student })}
            />
            <label htmlFor="advancementLevel">
              Advancement level:
              <select
                name="advancementLevel"
              >
                {advancementLevels.map((x: AdvancementLevel) => <option
                  key={x.id.toString()}
                  onClick={() => this.setState(() => ({ advancementLevel: x }))}
                >
                  {x.name}
                </option>)}
              </select>
            </label>
            <input
              type="submit"
              value="Add"
              disabled={!isValid}
            />
          </form>
        </>
      }
    </Form>
  }

  validations = {
    number: (number: string) => {
      if (isBlank(number)) return 'Required'
      if (!toArray(number).every(isDigit)) return 'Only numbers allowed'
      if (number.length !== NUMBER_DIGIT_COUNT) return `${NUMBER_DIGIT_COUNT} digits required`
      return null
    }
  }
}
