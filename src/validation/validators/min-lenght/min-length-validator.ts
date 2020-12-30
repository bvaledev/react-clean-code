import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidator implements FieldValidation {
  field: string;
  constructor (private readonly input: string, private readonly size: number) {}
  validate (value: string): Error {
    return value.length >= this.size ? null : new MinLenghtFieldError(this.input, this.size)
  }
}
