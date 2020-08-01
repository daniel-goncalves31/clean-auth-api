import { SignUpController } from './SignUpController'
import { HttpRequest } from '../protocols/http'
import { badRequest } from '../protocols/http-responses'
import { MissingParamError, InvalidParamError } from '../protocols/errors'
import { MockProxy, mock } from 'jest-mock-extended'
import { Validator } from '../protocols/Validator'

interface SutType {
  sut: SignUpController
  validatorStub: MockProxy<Validator>
}

const makeSut = (): SutType => {
  const validatorStub = mock<Validator>()
  const sut = new SignUpController(validatorStub)

  return {
    sut,
    validatorStub
  }
}

const fakeHttpRequest: HttpRequest = {
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
}

describe('SignUpController', () => {
  test('should call Validator with correct value', async () => {
    const { sut, validatorStub } = makeSut()

    await sut.handle(fakeHttpRequest)
    expect(validatorStub.validate).toHaveBeenCalledWith(fakeHttpRequest.body)
  })
})
