import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import faker from 'faker'
import { MinLengthValidator } from './min-length-validator'

const makeSut = (field: string): MinLengthValidator => new MinLengthValidator(field, 5)

describe('MinLength Validator', () => {
  test('Shoud return erro if min lenght is not reached', () => {
    const field = 'password'
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new MinLenghtFieldError('password', 5))
  })

  test('Shoud return falsy if min lenght is reached', () => {
    const field = 'password'
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field')

    const error = sut.validate({ invalidField: faker.random.alphaNumeric(5) })

    expect(error).toBeFalsy()
  })
})
