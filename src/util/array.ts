export function isEmptyArray(list: any[]): boolean {
  return list.length === 0
}
export function head<T>(list: T[]): T | null {
  return isEmptyArray(list) ? null : list[0]
}
