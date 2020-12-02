import { isEmptyArray } from "./array"

export const noop = () => {}
export const identity = <T>(x: T) => x
export const not = <TArgs extends any[]>(fn: (...args: TArgs) => boolean) => {
  return (...args: TArgs) => !fn(...args)
}
export const isNullish = (value: any): boolean => value === null || value === undefined
export const pipe = async (value: any, ...functions: { (value: any): any }[] ) => {
  return await functions.reduce(async (acc, fn) => fn(await acc), value)
}
