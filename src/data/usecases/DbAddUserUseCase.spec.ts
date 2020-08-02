import { DbAddUserUseCase } from './DbAddUserUseCase'
import { MockProxy, mock } from 'jest-mock-extended'
import { Encrypter } from '../protocols/Encrypter'
import { NewUserModel } from '@/domain/models/NewUser'

interface SutType {
  sut: DbAddUserUseCase
  encrypterStub: MockProxy<Encrypter>
}

const makeSut = (): SutType => {
  const encrypterStub = mock<Encrypter>()
  const sut = new DbAddUserUseCase(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddUserUseCase', () => {
  const fakeNewUser: NewUserModel = {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  }
  describe('Encrypter', () => {
    test('should call encrypter with correct value', async () => {
      const { sut, encrypterStub } = makeSut()

      await sut.add(fakeNewUser)
      expect(encrypterStub.encrypt).toHaveBeenCalledWith(fakeNewUser.password)
      expect(encrypterStub.encrypt).toHaveBeenCalledTimes(1)
    })
    test('should throw if encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut()
      encrypterStub.encrypt.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = sut.add(fakeNewUser)
      await expect(result).rejects.toThrow()
    })
  })
})
