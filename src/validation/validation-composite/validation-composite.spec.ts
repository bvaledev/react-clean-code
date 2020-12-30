import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test'

describe('Validation Composite', () => {
  test('Should return error if any validation return an error', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_error_message')

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
