import { Validator } from '../../protocols/Validator'
import validator from 'validator'
import { InvalidParamError } from '../../protocols/errors'

export class EmailValidator implements Validator {
  constructor (private readonly emailField: string) {}
  validate (input: any): Error | null {
    if (!validator.isEmail(input[this.emailField])) {
      return new InvalidParamError(this.emailField)
    }

    return null
  }
}
