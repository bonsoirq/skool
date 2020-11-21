import React, { Component } from 'react';
import { IStudent, Student } from '../entities/student';
import { PhoneNumber } from '../values/phone-number';
import { UUID } from '../values/uuid';
import { Condition } from './components/condition';

interface IProps {
  onCreate: (student: IStudent) => void
}

interface IState {
  name: string,
  lastName: string,
  phoneNo: string,
  phoneNoValid: boolean,
}

class NewStudent extends Component<IProps, IState> {
  state = {
    name: '',
    lastName: '',
    phoneNo: '',
    phoneNoValid: true,
  }

  _setName(name: string) {
    this.setState(s => ({ name }))
  }

  _setLastName(lastName: string) {
    this.setState(s => ({ lastName }))
  }

  _setPhoneNo(phoneNo: string) {
    const phoneNoValid = PhoneNumber.isValid(phoneNo)
    this.setState(s => ({ phoneNo, phoneNoValid }))
  }

  render() {
    const { name, lastName, phoneNo, phoneNoValid } = this.state
    return (
      <>
        <h3>Add a student</h3>
        <form action="">
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={name}
              onChange={e => this._setName(e.target.value)}
            />
          </label>
          <label>
            Lastname:
            <input
              name="lastname"
              type="text"
              value={lastName}
              onChange={e => this._setLastName(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              name="phone_no"
              type="text"
              value={phoneNo}
              onChange={e => this._setPhoneNo(e.target.value)}
            />
          </label>
          <Condition when={!phoneNoValid}>
            <span>Invalid phone number</span>
          </Condition>
          <input
            type="button"
            value="Add a student"
            disabled={!phoneNoValid}
            onClick={e => {
            const student = Student({ id: UUID(), name, lastName, phoneNo: new PhoneNumber(phoneNo) })
            this.props.onCreate(student)
          }} />
        </form>
      </>
    );
  }
}

export default NewStudent;
