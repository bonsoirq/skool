import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { Student } from '../entities/student';
import { Autocomplete, Suggestion } from './components/Autocomplete';
import { StudentsRepo } from '../repos/students-repo';
import { AppContext } from './AppContext';
import { StudentName } from './StudentName';
import { Form } from './components/Form';

interface IProps {
  onSelect: (student: Student) => void
}

interface IState {
  student: Student | null,
  suggestedStudents: Suggestion<Student>[],
}

export class StudentAutocomplete extends Component<IProps, IState> {
  static contextType = AppContext
  _studentsRepo = new StudentsRepo(this.context.connection)

  state: IState = {
    suggestedStudents: [],
    student: null,
  }

  render() {
    const { student, suggestedStudents } = this.state
    return <Form
      initialValues={{ studentSearch: '' }}
      validations={{}}
    >
      {({
        values,
        handleInputChange,
        restoreInitialValues,
      }) => <label htmlFor="studentSearch">
          <span className="form-label">Student: <StudentName student={student} /></span>
          <Autocomplete
            suggestions={suggestedStudents}
            name="studentSearch"
            type="search"
            value={values.studentSearch}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e)
              const suggestedStudents = isBlank(e.target.value) ? [] : await this._studentsRepo
                .withNameSimilarTo(e.target.value)
                .then(students => students.map(x => ({ value: x, label: `${x.name} ${x.lastName}` })))
              this.setState(() => ({ suggestedStudents }))
            }}
            onSuggestionSelect={(student: Student) => {
              this.setState({ student })
              this.props.onSelect(student)
              restoreInitialValues()
            }}
          />
          <span className="error-message"></span>
        </label>
      }
    </Form>
  }
}
