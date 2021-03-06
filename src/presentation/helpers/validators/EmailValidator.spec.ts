import { EmailValidator } from './EmailValidator'
import { InvalidParamError } from '../../protocols/errors'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

interface SutType {
  sut: EmailValidator
}

const makeSut = (): SutType => {
  const sut = new EmailValidator('email')

  return {
    sut
  }
}

describe('EmailValidator', () => {
  test('should call validator with correct value', () => {
    const { sut } = makeSut()
    const emailValidatorSpy = jest.spyOn(validator, 'isEmail')

    const input = { email: 'any_email@email.com' }
    sut.validate(input)

    expect(emailValidatorSpy).toHaveBeenCalledWith(input.email)
    expect(emailValidatorSpy).toHaveBeenCalledTimes(1)
  })
  test('should return an InvalidParamError if the validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const input = { email: 'invalid_email@email.com' }
    const error = sut.validate(input)

    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('should return return null if the validator returns true', () => {
    const { sut } = makeSut()

    const input = { email: 'valid_email@email.com' }
    const error = sut.validate(input)

    expect(error).toBeNull()
  })
})
