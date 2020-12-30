import { InvalidFieldError } from '@/validation/error/invalid-field-error'
import faker from 'faker'
import { EmailValidator } from './email-validator'

const makeSut = (): EmailValidator => new EmailValidator('email')

describe('Email Validator', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
