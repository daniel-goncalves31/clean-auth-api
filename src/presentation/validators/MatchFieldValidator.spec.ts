import { MatchFieldValidator } from './MatchFieldValidator'
import { InvalidParamError } from '../protocols/errors'

interface SutType {
  sut: MatchFieldValidator
}

const makeSut = (): SutType => {
  const sut = new MatchFieldValidator('field1', 'field2')

  return {
    sut
  }
}

describe('MatchFieldValidator', () => {
  test('should return InvalidParamError if the fields do not match', () => {
    const { sut } = makeSut()

    const input = {
      field1: 'any_value',
      field2: 'other_value'
    }

    const response = sut.validate(input)
    expect(response).toEqual(new InvalidParamError('field2'))
  })
})
