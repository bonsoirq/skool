export const noop = () => {}
export const identity = <T>(x: T) => x
export const not = <TArgs extends any[]>(fn: (...args: TArgs) => boolean) => {
  return (...args: TArgs) => !fn(...args)
}
export const isNullish = (value: any): boolean => value === null || value === undefined
