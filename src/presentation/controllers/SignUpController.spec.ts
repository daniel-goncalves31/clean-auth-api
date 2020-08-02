import { SignUpController } from './SignUpController'
import { HttpRequest } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-responses'
import { MockProxy, mock } from 'jest-mock-extended'
import { Validator } from '../protocols/Validator'
import { AddUserUseCase } from '@/domain/usercases/AddUser'

interface SutType {
  sut: SignUpController
  validatorStub: MockProxy<Validator>
  addUserUseCaseStub: MockProxy<AddUserUseCase>
}

const makeSut = (): SutType => {
  const validatorStub = mock<Validator>()
  const addUserUseCaseStub = mock<AddUserUseCase>()
  const sut = new SignUpController(validatorStub, addUserUseCaseStub)

  return {
    sut,
    validatorStub,
    addUserUseCaseStub
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
  describe('Validator', () => {
    test('should call Validator with correct value', async () => {
      const { sut, validatorStub } = makeSut()

      await sut.handle(fakeHttpRequest)
      expect(validatorStub.validate).toHaveBeenCalledWith(fakeHttpRequest.body)
    })
    test('should return 400 if Validator return an error', async () => {
      const { sut, validatorStub } = makeSut()
      validatorStub.validate.mockReturnValueOnce(new Error())

      const res = await sut.handle(fakeHttpRequest)
      expect(res).toEqual(badRequest(new Error()))
    })
  })
  describe('AddUserUseCase', () => {
    test('should call AddUser with correct values', async () => {
      const { sut, addUserUseCaseStub } = makeSut()
      await sut.handle(fakeHttpRequest)

      const newUser = fakeHttpRequest.body
      delete newUser.confirmPassword
      expect(addUserUseCaseStub.add).toHaveBeenCalledWith(newUser)
    })
    test('should returns an ServerError if the AddUser throws', async () => {
      const { sut, addUserUseCaseStub } = makeSut()
      addUserUseCaseStub.add.mockImplementationOnce(() => {
        throw new Error()
      })

      const httpResponse = await sut.handle(fakeHttpRequest)

      expect(httpResponse).toEqual(serverError())
    })
  })
})
