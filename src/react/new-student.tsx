import React, { Component } from 'react';
import { IStudent, Student } from '../entities/student';
import { isBlank } from '../util/string';
import { IErrors, IValidations } from './types';
import { PhoneNumber } from '../values/phone-number';
import { UUID } from '../values/uuid';

interface IProps {
  onCreate: (student: IStudent) => void
}

interface IState {
  values: {
    [field: string]: string,
  },
  errors: IErrors,
}

class NewStudent extends Component<IProps, IState> {
  state = NewStudent.initialState

  static get initialState () {
    return {
      values: {
        name: '',
        lastName: '',
        phoneNo: '',
      },
      errors: {
        name: null,
        lastName: null,
        phoneNo: null,
      },
    }
  }

  render() {
    const { name, lastName, phoneNo } = this.state.values
    return (
      <>
        <h3>Add a student</h3>
        <form action="" onSubmit={e => {
          e.preventDefault()
          const errors = this.validateForm()
          this.setState(() => ({ errors }), () => {
            if (this.hasErrors()) {
              return
            }
            const student = Student({ id: UUID(), name, lastName, phoneNo: new PhoneNumber(phoneNo) })
            this.props.onCreate(student)
            this.setState(NewStudent.initialState)
          })
        }}>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={name}
              onFocus={this.handleInputFocus}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </label>
          {this.state.errors.name}
          <label>
            Lastname:
            <input
              name="lastName"
              type="text"
              value={lastName}
              onFocus={this.handleInputFocus}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </label>
          {this.state.errors.lastName}
          <label>
            Phone Number:
            <input
              name="phoneNo"
              type="text"
              value={phoneNo}
              onFocus={this.handleInputFocus}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </label>
          {this.state.errors.phoneNo}
          <input
            type="submit"
            value="Add a student"
            disabled={this.hasErrors()}
          />
        </form>
      </>
    );
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState(s => ({ values: { ...s.values, [name]: value } }))
  }
  handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    this.setState(s => ({ errors: { ...s.errors, [name]: null } }))
  }
  handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = this.validateField(name, value)
    this.setState(s => ({
      errors: { ...s.errors, [name]: error },
    }))
  }

  validateField = (name: string, value: any) => this.validations[name](value)

  validateForm = () => {
    const errors: IErrors = {}
    for (const [key, value] of Object.entries(this.state.values)) {
      errors[key] = this.validateField(key, value)
    }
    return errors
  }

  hasErrors = () => {
    for (const error of Object.values(this.state.errors)) {
      if (error != null) {
        return true
      }
    }
    return false
  }

  validations: IValidations = {
    name: (name: string) => isBlank(name) ? 'Cannot be empty' : null,
    lastName: (lastName: string) => isBlank(lastName) ? 'Cannot be empty' : null,
    phoneNo: (phoneNo: string) => PhoneNumber.isValid(phoneNo) ? null : 'Invalid phone number',
  }
}

export default NewStudent;
