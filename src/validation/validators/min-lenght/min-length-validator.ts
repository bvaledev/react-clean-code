import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidator implements FieldValidation {
  constructor (readonly field: string, private readonly size: number) {}
  validate (input: object): Error {
    return input[this.field]?.length < this.size ? new MinLenghtFieldError(this.field, this.size) : null
  }
}
