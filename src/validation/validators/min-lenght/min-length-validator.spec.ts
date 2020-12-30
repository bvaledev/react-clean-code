import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import faker from 'faker'
import { MinLengthValidator } from './min-length-validator'

const makeSut = (size: number): MinLengthValidator => new MinLengthValidator('password', size)

describe('MinLength Validator', () => {
  test('Shoud return erro if min lenght is not reached', () => {
    const sut = makeSut(8)
    const error = sut.validate(faker.internet.password(7))
    expect(error).toEqual(new MinLenghtFieldError('password', 8))
  })

  test('Shoud return falsy if min lenght is reached', () => {
    const sut = makeSut(8)
    const error = sut.validate(faker.internet.password(8))
    expect(error).toBeFalsy()
  })
})
