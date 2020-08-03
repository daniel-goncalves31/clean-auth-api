import { UserTypeOrmRepository } from './UserRepository'
import { setupSqliteConnection, closeSqliteConnection } from '../sqlite-helper'

interface SutType {
  sut: UserTypeOrmRepository
}

const makeSut = (): SutType => {
  const sut = new UserTypeOrmRepository()

  return {
    sut
  }
}

beforeAll(async () => {
  await setupSqliteConnection()
})

afterAll(async () => {
  await closeSqliteConnection()
})

describe('UserTypeOrmRepository', () => {
  test('should return an user on success', async () => {
    const { sut } = makeSut()

    const fakeNewUser = {
      id: 'dasdas',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_password'
    }

    const user = await sut.add(fakeNewUser)

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.email).toBe('any_email@email.com')
    expect(user.password).toBe('hashed_password')
  })
})
