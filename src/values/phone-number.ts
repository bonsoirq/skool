import { filter, first, isBlank, last } from "../util/string"

const REGEXP = /^\+?\d{0,3}?\s?[5-8]\d{2}\s?\d{3}\s?\d{3}$/
const PHONE_NO_DIGIT_COUNT = 9
export class PhoneNumber {
  private _value: string
  constructor(value: string) {
    if (!PhoneNumber.isValid(value)) {
      throw Error(`Invalid phone number ${value}`)
    }
    this._value = filter(value, x => !isBlank(x))
  }

  toString() {
    return this._value
  }

  formattedString() {
    return [
      this.diallingCode,
      first(this.internalNumber, 3),
      this.internalNumber.substr(3, 3),
      last(this.internalNumber, 3),
    ].filter(x => !isBlank(x)).join(' ')
  }

  private get internalNumber (): string {
    const number = last(this._value, PHONE_NO_DIGIT_COUNT)
    return number
  }

  private get diallingCode (): string {
    const length = this._value.length - PHONE_NO_DIGIT_COUNT
    const code = first(this._value, length)
    return code
  }

  static isValid(value: string) {
    return REGEXP.test(value)
  }
}
