import { EmailValidator } from './EmailValidator'
import { InvalidParamError } from '../../protocols/errors'

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
  test('should return InvalidParamError if the email is not valid', () => {
    const { sut } = makeSut()
    const input = {
      email: 'invalid_email'
    }
    const res = sut.validate(input)
    expect(res).toEqual(new InvalidParamError('email'))
  })
})
