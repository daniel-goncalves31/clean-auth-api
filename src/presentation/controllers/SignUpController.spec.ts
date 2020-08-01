import { SignUpController } from './SignUpController'
import { HttpRequest } from '../protocols/http'
import { MissingParamError } from '../protocols/errors/MissingParamError'
import { badRequest } from '../protocols/http-responses'

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
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
