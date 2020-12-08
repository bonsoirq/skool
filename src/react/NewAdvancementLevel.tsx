import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { AdvancementLevel, buildAdvancementLevel } from '../entities/advancement-level';
import { Form } from './components/Form';
import { Course } from '../entities/course';
import { AdvancementLevelsRepo } from '../repos/advancement-levels-repo';
import { AppContext } from './AppContext';

interface IProps {
  onCreate: (student: AdvancementLevel) => void
  course: Course;
}

export class NewAdvancementLevel extends Component<IProps, any> {
  static contextType = AppContext
  private _repository = new AdvancementLevelsRepo(this.context.connection)

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
            handleSubmit(e, async () => {
              const { name } = values
              const advancementLevel = buildAdvancementLevel({ name, courseId: course.id, position: 0 })
              const lastLevel = await this._repository.last({ courseId: course.id })
              if (lastLevel != null) {
                lastLevel.nextLevelId = advancementLevel.id
                advancementLevel.position = lastLevel.position + 1
                await this._repository.save(lastLevel)
              }
              await this._repository.add(advancementLevel)
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
