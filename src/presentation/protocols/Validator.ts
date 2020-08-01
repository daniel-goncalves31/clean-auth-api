export interface Validator {
  validate(value: any): Error | null
}
