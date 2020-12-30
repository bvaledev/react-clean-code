import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/error'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
