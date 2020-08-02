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
  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const result = sut.encrypt(value)
    await expect(result).rejects.toThrow()
  })
  test('should return an hash on success', async () => {
    const { sut } = makeSut()

    const response = await sut.encrypt(value)
    expect(response).toBe('hashed_value')
  })
})
