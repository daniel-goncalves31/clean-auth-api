import { SignUpController } from './SignUpController'
import { HttpRequest } from '../protocols/http'
import { MissingParamError } from '../protocols/errors/MissingParamError'

interface SutType {
  sut: SignUpController
}

const makeSut = (): SutType => {
  const sut = new SignUpController()

  return {
    sut
  }
}

describe('SignUpController', () => {
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = { body: {} }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      status: 400,
      body: new MissingParamError('email')
    })
  })
  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = { body: { email: 'any_email@email.com' } }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      status: 400,
      body: new MissingParamError('email')
    })
  })
})
