export type ValidationMessage = string | null
export interface IValidations {
  [key: string]: (value: any) => ValidationMessage
}
export interface IErrors {
  [key: string]: ValidationMessage
}
export interface ITouched {
  [key: string]: boolean
}
