import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import faker from 'faker'
import { MinLengthValidator } from './min-length-validator'

const makeSut = (): MinLengthValidator => new MinLengthValidator('password', 8)

describe('MinLength Validator', () => {
  test('Shoud return erro if min lenght is not reached', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.password(7))
    expect(error).toEqual(new MinLenghtFieldError('password', 8))
  })

  test('Shoud return falsy if min lenght is reached', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.password(8))
    expect(error).toBeFalsy()
  })
})
