import { isDateString, parseString, toString } from "../util/date";

export class SerializeDate {
  static toObject(dateString: string) {
    if (isDateString(dateString)) {
      return parseString(dateString)
    }
    throw Error(`Cannot serialize ${dateString} to Date`)
  }

  static toDatabase(date: Date) {
    return toString(date)
  }
}
