import { InvalidFieldError } from '@/validation/error'
import faker from 'faker'
import { EmailValidator } from './email-validator'

const makeSut = (): EmailValidator => new EmailValidator('email')

describe('Email Validator', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('invalid@email')
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
