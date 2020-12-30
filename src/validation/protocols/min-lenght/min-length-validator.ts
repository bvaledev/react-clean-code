import { MinLenghtFieldError } from '@/validation/error/min-lenght-field-error'
import { FieldValidation } from '../field-validation'

export class MinLengthValidator implements FieldValidation {
  field: string;
  constructor (private readonly input: string, private readonly size: number) {}
  validate (value: string): Error {
    return value.length >= 8 ? null : new MinLenghtFieldError(this.input, this.size)
  }
}
