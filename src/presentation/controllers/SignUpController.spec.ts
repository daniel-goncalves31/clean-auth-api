import { SignUpController } from '@/presentation/controllers/SignUpController'

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
    const httpRequest = { body: {} }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 400 })
  })
})
