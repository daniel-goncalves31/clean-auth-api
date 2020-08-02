import { DbAddUserUseCase } from './DbAddUserUseCase'
import { MockProxy, mock } from 'jest-mock-extended'
import { Encrypter } from '../protocols/Encrypter'
import { NewUserModel } from '@/domain/models/NewUser'
import { AddUserRepository } from '../protocols/AddUserRepository'
import { UserModel } from '@/domain/models/User'

const fakeNewUser: NewUserModel = {
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
}

const user: UserModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
}

interface SutType {
  sut: DbAddUserUseCase
  encrypterStub: MockProxy<Encrypter>
  addUserRepositoryStub: MockProxy<AddUserRepository>
}

const makeSut = (): SutType => {
  const encrypterStub = mock<Encrypter>()
  encrypterStub.encrypt.mockReturnValue(Promise.resolve('hash_password'))

  const addUserRepositoryStub = mock<AddUserRepository>()
  addUserRepositoryStub.add.mockReturnValue(Promise.resolve(user))

  const sut = new DbAddUserUseCase(encrypterStub, addUserRepositoryStub)

  return {
    sut,
    encrypterStub,
    addUserRepositoryStub
  }
}

describe('DbAddUserUseCase', () => {
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
  describe('AddUserRepository', () => {
    test('should call repository with correct value', async () => {
      const { sut, addUserRepositoryStub } = makeSut()
      await sut.add(fakeNewUser)

      expect(addUserRepositoryStub.add).toHaveBeenCalledTimes(1)
      expect(addUserRepositoryStub.add).toHaveBeenCalledWith({
        ...fakeNewUser,
        password: 'hash_password'
      })
    })
    test('should throw if the repository throws', async () => {
      const { sut, addUserRepositoryStub } = makeSut()
      addUserRepositoryStub.add.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = sut.add(fakeNewUser)

      await expect(result).rejects.toThrow()
    })
    test('should return an User on success', async () => {
      const { sut } = makeSut()

      const response = await sut.add(fakeNewUser)

      expect(response).toEqual(user)
    })
  })
})
