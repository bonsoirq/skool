import React, { Component } from 'react';
import { Student, buildStudent } from '../entities/student';
import { isBlank } from '../util/string';
import { PhoneNumber } from '../values/phone-number';
import { Form } from './components/Form';

interface IProps {
  onCreate: (student: Student) => void
}

interface IState {
}

export class NewStudent extends Component<IProps, IState> {
  render() {
    return (
      <Form
      initialValues={{
        name: '',
        lastName: '',
        phoneNo: '',
      }}
      validations={this.validations}
      >
        {
          ({
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
            <h3>Add a student</h3>
            <form action="" onSubmit={e => {
              handleSubmit(e, () => {
                const { name, lastName, phoneNo } = values
                const student = buildStudent({ name, lastName, phoneNo: new PhoneNumber(phoneNo) })
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
              <label>
                Lastname:
                <input
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  onFocus={handleInputFocus}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </label>
              {errors.lastName}
              <label>
                Phone Number:
                <input
                  name="phoneNo"
                  type="text"
                  value={values.phoneNo}
                  onFocus={handleInputFocus}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </label>
              {errors.phoneNo}
              <input
                type="submit"
                value="Add a student"
                disabled={!isValid}
              />
            </form>
          </>
        }
      </Form>
    );
  }

  validations = {
    name: (name: string) => isBlank(name) ? 'Required' : null,
    lastName: (lastName: string) => isBlank(lastName) ? 'Required' : null,
    phoneNo: (phoneNo: string) => PhoneNumber.isValid(phoneNo) ? null : 'Invalid phone number',
  }
}
