import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { AdvancementLevel, buildAdvancementLevel } from '../entities/advancement-level';
import { Form } from './components/Form';
import { CourseSelect } from './CourseSelect';
import { Course } from '../entities/course';


interface IProps {
  onCreate: (student: AdvancementLevel) => void
}

interface IState {
  course: Course | null;
}

export class NewAdvancementLevel extends Component<IProps, IState> {
  state: IState = {
    course: null
  }

  render() {
    const { course } = this.state
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
          <form action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { name } = values
              if (course != null) {
                const advancementLevel = buildAdvancementLevel({ name, courseId: course.id })
                this.props.onCreate(advancementLevel)
                restoreInitialValues()
              }
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
            Course:
            <CourseSelect
              onSelect={course => this.setState(() => ({ course }))}
            />
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
