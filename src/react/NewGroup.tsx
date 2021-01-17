import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { Group, buildGroup } from '../entities/group';
import { Form } from './components/Form';
import { AdvancementLevel } from '../entities/advancement-level';
import { isNullish } from '../util/function';
import { AdvancementLevelSelect } from './AdvancementLevelSelect';
import { CourseContext } from './CourseContext';

interface IProps {
  onCreate: (student: Group) => void
}

interface IState {
  advancementLevel: AdvancementLevel | null
}

export class NewGroup extends Component<IProps, IState> {
  state: IState = {
    advancementLevel: null
  }
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
          <h3>Nowa grupa</h3>
          <form className="form-inline" action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { name } = values
              const { advancementLevel } = this.state
              const student = buildGroup({ name, advancementLevelId: advancementLevel!.id })
              this.props.onCreate(student)
              restoreInitialValues()
            })
          }}>
            <label>
            <span className="form-label">Nazwa:</span>
            <input
                className="form-field"
                name="name"
                type="text"
                value={values.name}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <span className="error-message">{errors.name}</span>
            </label>
            <label>
              <span className="form-label">Poziom zaawansowania:</span>
              <CourseContext.Consumer>
                {({ course }) => <>
                  <AdvancementLevelSelect
                    course={course!}
                    onSelect={advancementLevel => {
                      this.setState(() => ({ advancementLevel }))
                    }}
                  />
                </>}
              </CourseContext.Consumer>
              <span className="error-message">{errors.advancementLevel}</span>
            </label>
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
    name: (name: string) => isBlank(name) ? 'Wymagane' : null,
    advancementLevel: () => isNullish(this.state.advancementLevel) ? 'Wymagane' : null,
  }
}
