import { SignUpController } from './SignUpController'
import { HttpRequest } from '../protocols/http'
import { badRequest, serverError, ok } from '../helpers/http-responses'
import { MockProxy, mock } from 'jest-mock-extended'
import { Validator } from '../protocols/Validator'
import { AddUserUseCase } from '@/domain/usercases/AddUser'
import { UserModel } from '@/domain/models/User'

const fakeHttpRequest: HttpRequest = {
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
}

const fakeUser: UserModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
}

interface SutType {
  sut: SignUpController
  validatorStub: MockProxy<Validator>
  addUserUseCaseStub: MockProxy<AddUserUseCase>
}

const makeSut = (): SutType => {
  const validatorStub = mock<Validator>()
  const addUserUseCaseStub = mock<AddUserUseCase>()
  addUserUseCaseStub.add.mockReturnValue(Promise.resolve(fakeUser))

  const sut = new SignUpController(validatorStub, addUserUseCaseStub)

  return {
    sut,
    validatorStub,
    addUserUseCaseStub
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
    test('should returns 500 if the AddUser throws', async () => {
      const { sut, addUserUseCaseStub } = makeSut()
      addUserUseCaseStub.add.mockImplementationOnce(() => {
        throw new Error()
      })

      const httpResponse = await sut.handle(fakeHttpRequest)

      expect(httpResponse).toEqual(serverError())
    })
  })
  test('should returns 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(fakeHttpRequest)

    expect(httpResponse).toEqual(ok(fakeUser))
  })
})
