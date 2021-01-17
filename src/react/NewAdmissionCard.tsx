import React, { Component } from 'react';
import { isBlank, isDigit, toArray } from '../util/string';
import { buildAdmissionCard, AdmissionCard, NUMBER_DIGIT_COUNT } from '../entities/admission-card';
import { fullName, Student } from '../entities/student';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { StudentAutocomplete } from './StudentAutocomplete';
import { Form } from './components/Form';
import { isNullish } from '../util/function';
import { AdmissionCardAggregatesRepo } from '../repos/admission-card-aggregates-repo';

interface IProps {
  onCreate: (admisionCard: AdmissionCard) => void
}

interface IState {
  student: Student | null,
}

export class NewAdmissionCard extends Component<IProps, IState> {
  state: IState = {
    student: null,
  }
  static contextType = AppContext
  _repo = new AdmissionCardAggregatesRepo(this.context.connection)
  _studentsRepo = new StudentsRepo(this.context.connection)

  render() {
    const { student } = this.state
    return <Form
      initialValues={{ number: '' }}
      validations={this.validations}
    >
      {({
        values,
        errors,
        validate,
        isValid,
        handleInputBlur,
        handleInputChange,
        handleInputFocus,
        restoreInitialValues,
        handleSubmit,
      }) =>
        <>
          <h3>Dodaj karnet</h3>
          <form className="form-inline" action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { number } = values
              if (student != null) {
                const admissionCard = buildAdmissionCard({ number, studentId: student!.id })
                this.props.onCreate(admissionCard)
                restoreInitialValues()
                this.setState(() => ({ student: null }))
              }
            })
          }}>
            <label htmlFor="number">
              <span className="form-label">Numer:</span>
              <input
                className="form-field"
                name="number"
                type="text"
                maxLength={NUMBER_DIGIT_COUNT}
                value={values.number}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <span className="error-message">{errors.number}</span>
            </label>
            <StudentAutocomplete
              onSelect={(student: Student) => this.setState(() => ({ student }), validate)}
            />
            { errors.student }
            <input
              className="form-field"
              type="submit"
              value="Dodaj"
              disabled={!isValid}
            />
          </form>
        </>
      }
    </Form>
  }

  validations = {
    number: async (number: string) => {
      if (isBlank(number)) return 'Wymagane'
      if (!toArray(number).every(isDigit)) return 'Można wpisywać tylko cyfry'
      if (number.length !== NUMBER_DIGIT_COUNT) return `${NUMBER_DIGIT_COUNT} cyfr wymagane`
      const aggregate = await this._repo.findByNumber(number)
      if (!isNullish(aggregate)) return `Już przypisano do ${fullName(aggregate!.student)}`
      return null
    },
    student: () => {
      if (this.state.student == null) return 'Wybierz kursanta'
    }
  }
}
