import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test'
import { FieldValidation } from '../protocols'

const makeValidators = (error: Error = null): FieldValidation[] => {
  const fieldValidationSpy = new FieldValidationSpy('any_field')
  const fieldValidationSpy2 = new FieldValidationSpy('any_field')
  fieldValidationSpy2.error = error

  return [
    fieldValidationSpy,
    fieldValidationSpy2
  ]
}

const makeSut = (validators: FieldValidation[]): ValidationComposite => new ValidationComposite(validators)
describe('Validation Composite', () => {
  test('Should return error if any validation return an error', () => {
    const sut = makeSut(makeValidators(new Error('any_error_message')))
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })

  test('Should return falsy if any validation return falsy', () => {
    const sut = makeSut(makeValidators())
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBeFalsy()
  })
})
