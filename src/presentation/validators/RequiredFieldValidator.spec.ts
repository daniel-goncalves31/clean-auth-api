import { RequiredFieldValidator } from './RequiredFieldValidator'
import { HttpRequest } from '../protocols/http'
import { MissingParamError } from '../protocols/errors'

interface SutType {
  sut: RequiredFieldValidator
}

const makeSut = (): SutType => {
  const sut = new RequiredFieldValidator('field2')

  return {
    sut
  }
}

describe('RequiredFieldValidator', () => {
  test('should return an MissingParamError if an field is not provided', () => {
    const { sut } = makeSut()

    const fakeHttpRequest: HttpRequest = {
      body: {
        field1: 'any_value',
        field3: 'any_value'
      }
    }

    const response = sut.validate(fakeHttpRequest)
    expect(response).toEqual(new MissingParamError('field2'))
  })
})
