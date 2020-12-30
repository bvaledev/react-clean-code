import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/error'

export class RequiredFieldValidator implements FieldValidation {
  constructor (readonly field: string) {}
  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
