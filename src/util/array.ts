export function isEmptyArray(list: any[]): boolean {
  return list.length === 0
}
export function head<T>(list: T[]): T | null {
  return isEmptyArray(list) ? null : list[0]
}

export function last<T>(list: T[]): T | null {
  return head([...list].reverse())
}
