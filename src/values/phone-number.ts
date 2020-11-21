const REGEXP = /^\+?\d{0,3}?\s?[5-8]\d{2}\s?\d{3}\s?\d{3}$/
export class PhoneNumber {
  private _value: string
  constructor(value: string) {
    if (!PhoneNumber.isValid(value)) {
      throw Error(`Invalid phone number ${value}`)
    }
    this._value = value
  }

  toString() {
    return this._value
  }

  static isValid(value: string) {
    return REGEXP.test(value)
  }
}
