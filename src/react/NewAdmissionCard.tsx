import React, { Component } from 'react';
import { isBlank, isDigit, toArray } from '../util/string';
import { IErrors, IValidations } from './types';
import { buildAdmissionCard, AdmissionCard, NUMBER_DIGIT_COUNT } from '../entities/admission-card';
import { Student } from '../entities/student';
import { AdvancementLevel } from '../entities/advancement-level';
import { Autocomplete, Suggestion } from './components/Autocomplete';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { noop } from '../util/function';
import { StudentName } from './StudentName';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { head } from '../util/list';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';

interface IProps {
  onCreate: (admisionCard: AdmissionCard) => void
}

interface IState {
  student: Student | null,
  suggestedStudents: Suggestion<Student>[],
  advancementLevel: AdvancementLevel | null,
  advancementLevels: AdvancementLevel[],
  values: {
    [field: string]: string,
  },
  errors: IErrors,
}

export class NewAdmissionCard extends Component<IProps, IState> {
  state: IState = NewAdmissionCard.initialState
  static contextType = AppContext
  _studentsRepo = new StudentsRepo(this.context.connection)
  _advancementLevelsRepo = new AdvancementLevelsRepo(this.context.connection)

  static get initialState() {
    return {
      student: null,
      suggestedStudents: [],
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
    const { number, studentSearch } = this.state.values
    const { student, advancementLevel, advancementLevels, suggestedStudents } = this.state
    return (
      <>
        <h3>Add a admissionCard</h3>
        <form action="" onSubmit={e => {
          e.preventDefault()
          const errors = this.validateForm()
          this.setState(() => ({ errors }), () => {
            if (this.hasErrors() || student == null || advancementLevel == null) {
              return
            }
            const admissionCard = buildAdmissionCard({ number, studentId: student.id, advancementLevelId: advancementLevel.id })
            this.props.onCreate(admissionCard)
            const { values, errors } = NewAdmissionCard.initialState
            this.setState(() => ({ values, errors }))
          })
        }}>
          <label htmlFor="number">
            Number:
            <input
              name="number"
              type="text"
              maxLength={NUMBER_DIGIT_COUNT}
              value={number}
              onFocus={this.handleInputFocus}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </label>
          {this.state.errors.number}
          <label htmlFor="studentSearch">
            Student:
            <StudentName student={student} />
            <Autocomplete
              suggestions={suggestedStudents}
              name="studentSearch"
              type="search"
              value={studentSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleInputChange(e, async () => {
                  const suggestedStudents = isBlank(e.target.value) ? [] : await this._studentsRepo
                    .withNameSimilarTo(e.target.value)
                    .then(students => students.map(x => ({ value: x, label: `${x.name} ${x.lastName}` })))
                  this.setState(() => ({ suggestedStudents }))
                })
              }}
              onSuggestionSelect={(student: Student) => this.setState({ student })}
            />
          </label>
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
            disabled={this.hasErrors() || student == null}
          />
        </form>
      </>
    );
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, callback = noop) => {
    const { name, value } = e.target
    this.setState(s => ({ values: { ...s.values, [name]: value } }), callback)
  }
  handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    this.setState(s => ({ errors: { ...s.errors, [name]: null } }))
  }
  handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = this.validateField(name, value)
    this.setState(s => ({
      errors: { ...s.errors, [name]: error },
    }))
  }

  validateField = (name: string, value: any) => this.validations[name](value)

  validateForm = () => {
    const errors: IErrors = {}
    for (const [key, value] of Object.entries(this.state.values)) {
      errors[key] = this.validateField(key, value)
    }
    return errors
  }

  hasErrors = () => {
    for (const error of Object.values(this.state.errors)) {
      if (error != null) {
        return true
      }
    }
    return false
  }

  validations: IValidations = {
    number: (number: string) => {
      if (!toArray(number).every(isDigit)) return 'Only numbers allowed'
      if (number.length !== NUMBER_DIGIT_COUNT) return `${NUMBER_DIGIT_COUNT} digits required`
      return null
    },
    studentSearch: () => null
  }
}
