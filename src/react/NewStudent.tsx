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
        gender: 'male',
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
            <form className="form-inline" action="" onSubmit={e => {
              handleSubmit(e, () => {
                const { name, lastName, phoneNo, gender } = values
                const student = buildStudent({ name, lastName, gender, phoneNo: new PhoneNumber(phoneNo) })
                this.props.onCreate(student)
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
                <span className="error-message">{errors.name}</span>
              </label>
              <label>
                <span className="form-label">Lastname:</span>
                <input
                  className="form-field"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  onFocus={handleInputFocus}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <span className="error-message">{errors.lastName}</span>
              </label>
              <label>
                <span className="form-label">Gender:</span>
                <select
                  className="form-field"
                  name="gender"
                  value={values.gender}
                  onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span className="error-message"></span>
              </label>
              <label>
                <span className="form-label">Phone Number:</span>
                <input
                  className="form-field"
                  name="phoneNo"
                  type="text"
                  value={values.phoneNo}
                  onFocus={handleInputFocus}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <span className="error-message">{errors.phoneNo}</span>
              </label>
              <input
                className="form-field"
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
