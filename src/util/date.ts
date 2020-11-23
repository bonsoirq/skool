import { format, formatISO, isValid, parseISO } from "date-fns";

export const isISODateString = (aString: string): boolean => isValid(parseISO(aString))
export const parseISOString = (aString: string): Date => parseISO(aString)
export const toISOString = (aDate: Date): string => formatISO(aDate)
export const now = (): Date => new Date()
export const formatDate = (aDate: Date): string => format(aDate, 'yyyy/MM/dd HH:mm')
