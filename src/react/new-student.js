import React, { Component } from 'react';
import { Student } from '../entities/student';

class NewStudent extends Component {
  state = {
    name: '',
    lastName: ''
  }

  _setName(name) {
    this.setState(s => ({ name }))
  }

  _setLastName(lastName) {
    this.setState(s => ({ lastName }))
  }

  render() {
    const { name, lastName } = this.state
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
          <input
            type="button"
            value="Add a student"
            onClick={e => {
            const student = new Student({name, lastName})
            this.props.onCreate(student)
          }} />
        </form>
      </>
    );
  }
}

export default NewStudent;
