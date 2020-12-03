import { v4, validate } from 'uuid';

export class UUIDv4 {
  private _value: string
  constructor(value: string) {
    if (!UUIDv4.isValid(value)) {
      throw Error(`Invalid UUID value ${value}`)
    }
    this._value = value
  }

  toString() {
    return this._value
  }

  equals(other: UUIDv4): boolean {
    return this.toString() === other.toString()
  }

  static isValid(value: string): boolean {
    return validate(value)
  }
}

export function UUID(value: string = v4()) {
  return new UUIDv4(value)
}
