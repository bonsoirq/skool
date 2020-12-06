import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { AdvancementLevel, buildAdvancementLevel } from '../entities/advancement-level';
import { Form } from './components/Form';
import { Course } from '../entities/course';


interface IProps {
  onCreate: (student: AdvancementLevel) => void
  course: Course;
}

export class NewAdvancementLevel extends Component<IProps, any> {
  render() {
    const { course } = this.props
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
          <h3>New advancement level</h3>
          <form className="form-inline" action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { name } = values
              const advancementLevel = buildAdvancementLevel({ name, courseId: course.id })
              this.props.onCreate(advancementLevel)
              restoreInitialValues()
            })
          }}>
            <label>
              <span className="form-label">Name:</span>
              <input
                className="form-field"
                name="name"
                type="text"
                value={values.name}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <div className="error-message">{errors.name}</div>
            </label>
            <input
              className="form-field"
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
