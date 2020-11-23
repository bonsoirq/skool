import { isISODateString, parseISOString, toISOString } from "../util/date";

export class SerializeDate {
  static toObject(dateString: string) {
    if (isISODateString(dateString)) {
      return parseISOString(dateString)
    }
    throw Error(`Cannot serialize ${dateString} to Date`)
  }

  static toDatabase(date: Date) {
    return toISOString(date)
  }
}
