import { Validator } from '../protocols/Validator'
import { InvalidParamError } from '../protocols/errors'

export class MatchFieldValidator implements Validator {
  constructor (
    private readonly fieldToCompare: string,
    private readonly field: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.field)
    }
    return null
  }
}
