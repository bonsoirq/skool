import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { Course, buildCourse } from '../entities/course';
import { Form } from './components/Form';


interface IProps {
  onCreate: (student: Course) => void
}

interface IState {
}

export class NewCourse extends Component<IProps, IState> {
  render() {
    return <Form
      initialValues={{ name: '' }}
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
          <h3>New course</h3>
          <form action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { name } = values
              const student = buildCourse({ name })
              this.props.onCreate(student)
              restoreInitialValues()
            })
          }}>
            <label>
              Name:
            <input
                name="name"
                type="text"
                value={values.name}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </label>
            {errors.name}
            <input
              type="submit"
              value="Create"
              disabled={!isValid}
            />
          </form>
        </>
      }
    </Form>
  }

  validations = {
    name: (name: string) => isBlank(name) ? 'Required' : null,
  }
}
