import { format, isValid, parse } from "date-fns";
const FORMAT = `yyyy-MM-dd'T'HH:mm:ss.SSS xxx`

export const now = (): Date => new Date()
export const parseString = (aString: string): Date => parse(aString, FORMAT, now())
export const isDateString = (aString: string): boolean => isValid(parseString(aString))
export const toString = (aDate: Date): string => format(aDate, FORMAT)
export const formatDate = (aDate: Date): string => format(aDate, 'yyyy/MM/dd HH:mm')
