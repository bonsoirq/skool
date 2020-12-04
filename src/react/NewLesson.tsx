import React, { Component } from 'react';
import { isBlank } from '../util/string';
import { Group } from '../entities/group';
import { Form } from './components/Form';
import { AdvancementLevel } from '../entities/advancement-level';
import { isNullish } from '../util/function';
import { AdvancementLevelSelect } from './AdvancementLevelSelect';
import { CourseContext } from './CourseContext';
import { GroupSelect } from './GroupSelect';
import { buildLesson, Lesson } from '../entities/lesson';

interface IProps {
  onCreate: (lesson: Lesson) => void
}

interface IState {
  advancementLevel: AdvancementLevel | null
  group: Group | null
}

export class NewLesson extends Component<IProps, IState> {
  state: IState = {
    advancementLevel: null,
    group: null,
  }
  render() {
    return <Form
      initialValues={{ topic: '' }}
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
          <h3>New lesson</h3>
          <form action="" onSubmit={e => {
            handleSubmit(e, () => {
              const { topic } = values
              const { advancementLevel, group } = this.state
              const lesson = buildLesson({ topic, advancementLevelId: advancementLevel!.id, groupId: group!.id })
              this.props.onCreate(lesson)
              restoreInitialValues()
            })
          }}>
            <label>
              Topic:
            <input
                name="topic"
                type="text"
                value={values.topic}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </label>
            {errors.topic}
            <CourseContext.Consumer>
              {({ course }) => <>
                Group:
                <GroupSelect
                  course={course!}
                  onSelect={group => {
                    this.setState(() => ({ group }))
                  }}
                />
                {errors.group}
                Advancement Level
                <AdvancementLevelSelect
                  course={course!}
                  onSelect={advancementLevel => {
                    this.setState(() => ({ advancementLevel }))
                  }}
                />
                {errors.advancementLevel}
              </>}
            </CourseContext.Consumer>
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
    topic: (topic: string) => isBlank(topic) ? 'Required' : null,
    advancementLevel: () => isNullish(this.state.advancementLevel) ? 'Required' : null,
    group: () => isNullish(this.state.group) ? 'Required' : null,
  }
}
