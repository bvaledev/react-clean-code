import { RequiredFieldError } from '../../error'
import { RequiredFieldValidator } from './required-field-validator'
import faker from 'faker'

const makeSut = (): RequiredFieldValidator => new RequiredFieldValidator(faker.database.column())

describe('RequiredField Validator', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
