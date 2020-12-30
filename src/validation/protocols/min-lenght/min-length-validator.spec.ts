import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import { MinLengthValidator } from './min-length-validator'

const makeSut = (): MinLengthValidator => new MinLengthValidator('password', 8)

describe('MinLength Valitador', () => {
  test('Shoud return erro if min lenght is not reached', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new MinLenghtFieldError('password', 8))
  })
})
