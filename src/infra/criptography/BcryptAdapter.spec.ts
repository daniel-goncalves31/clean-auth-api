import { BcryptAdapter } from './BcryptAdapter'
import bcrypt from 'bcrypt'

const value = 'any_value'
const salt = 12

jest.mock('bcrypt', () => ({
  hash (): Promise<string> {
    return Promise.resolve('hashed_value')
  }
}))

interface SutType {
  sut: BcryptAdapter
}

const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt)

  return {
    sut
  }
}

describe('BcryptAdapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt(value)
    expect(bcryptSpy).toHaveBeenCalledWith(value, salt)
    expect(bcryptSpy).toHaveBeenCalledTimes(1)
  })
})
