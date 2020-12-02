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
          <h3>Add an admissionCard</h3>
          <form action="" onSubmit={e => {
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
              onSelect={(student: Student) => this.setState(() => ({ student }), validate)}
            />
            { errors.student }
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
    number: async (number: string) => {
      if (isBlank(number)) return 'Required'
      if (!toArray(number).every(isDigit)) return 'Only numbers allowed'
      if (number.length !== NUMBER_DIGIT_COUNT) return `${NUMBER_DIGIT_COUNT} digits required`
      const aggregate = await this._repo.findByNumber(number)
      if (!isNullish(aggregate)) return `Already assigned to ${fullName(aggregate!.student)}`
      return null
    },
    student: () => {
      if (this.state.student == null) return 'Student required'
    }
  }
}
