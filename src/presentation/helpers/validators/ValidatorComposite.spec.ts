import { ValidatorComposite } from './ValidatorComposite'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validator } from '@/presentation/protocols/Validator'

interface SutType {
  sut: ValidatorComposite
  validator1: MockProxy<Validator>
  validator2: MockProxy<Validator>
}

const makeSut = (): SutType => {
  const validator1 = mock<Validator>()
  validator1.validate.mockReturnValue(null)
  const validator2 = mock<Validator>()
  validator2.validate.mockReturnValue(null)

  const validators = [validator1, validator2]
  const sut = new ValidatorComposite(validators)

  return {
    sut,
    validator1,
    validator2
  }
}

describe('ValidatorComposite', () => {
  test('should return an Error if one validator fails', () => {
    const { sut, validator2 } = makeSut()
    validator2.validate.mockReturnValueOnce(new Error())

    const error = sut.validate({})
    expect(error).toEqual(new Error())
  })
})
