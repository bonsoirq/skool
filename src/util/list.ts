export function isEmpty(list: any[]): boolean {
  return list.length === 0
}
export function head<T>(list: T[]): T | null {
  return isEmpty(list) ? null : list[0]
}
