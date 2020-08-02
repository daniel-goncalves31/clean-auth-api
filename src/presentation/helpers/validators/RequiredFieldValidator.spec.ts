import { RequiredFieldValidator } from './RequiredFieldValidator'
import { MissingParamError } from '../../protocols/errors'

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

    const input = {
      field1: 'any_value',
      field3: 'any_value'
    }

    const response = sut.validate(input)
    expect(response).toEqual(new MissingParamError('field2'))
  })
  test('should return null if the required field is provided', () => {
    const { sut } = makeSut()

    const input = {
      field1: 'any_value',
      field2: 'any_value'
    }

    const response = sut.validate(input)
    expect(response).toBeNull()
  })
})
