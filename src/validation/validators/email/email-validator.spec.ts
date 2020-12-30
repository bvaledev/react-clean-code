import { InvalidFieldError } from '@/validation/error'
import faker from 'faker'
import { EmailValidator } from './email-validator'

const makeSut = (field: string): EmailValidator => new EmailValidator(field)

describe('Email Validator', () => {
  test('Should return error if email is invalid', () => {
    const field = 'email'
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const field = 'email'
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email empty', () => {
    const field = 'email'
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
