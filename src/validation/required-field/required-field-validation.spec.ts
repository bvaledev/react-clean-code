import { RequiredFieldError } from '../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('email')
    expect(error).toEqual(new RequiredFieldError())
  })
})
