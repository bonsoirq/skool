type Predicate<T> = (value: T) => boolean
export const isEmpty = (aString: string): boolean => aString === ''
export const isBlank = (aString: string): boolean => isEmpty(aString.trim())
export const isDigit = (aString: string): boolean => /^\d$/.test(aString)
export const filter = (aString: string, predicate: Predicate<string>): string => {
  return Array.from(aString).filter(predicate).join('')
}
export const first = (aString: string, number: number) => aString.substr(0, number)
export const last = (aString: string, number: number) => aString.substr(aString.length - number, number)
export const toArray = (aString: string): string[] => Array.from(aString)
