export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing the ${paramName} field`)
    this.name = 'MissingParamError'
  }
}
