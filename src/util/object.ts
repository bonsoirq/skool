import { isEmptyArray } from "./array"

type ObjectPredicate = (key: string, value: unknown) => boolean
export const filter = <TObject extends {}>(anObject: TObject, predicate: ObjectPredicate) => {
  const entries = Object.entries(anObject)
  const filteredEntries = entries.filter(([key, value]) => predicate(key, value))
  return Object.fromEntries(filteredEntries)
}

export const omit = <TObject extends {}>(anObject: TObject, ...keys: string[]) => {
  return filter(anObject, (key) => !keys.includes(key))
}

export const isEmptyObject = <TObject extends {}>(anObject: TObject): boolean => isEmptyArray(Object.entries(anObject))

export const copy = <TObject extends {}>(anObject: TObject): TObject => ({...anObject})
