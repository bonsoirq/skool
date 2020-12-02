export const map = <T, TResult>(array: T[], fn: (x: T) => Promise<TResult>): Promise<TResult[]> => {
  return Promise.all(array.map(fn))
}
