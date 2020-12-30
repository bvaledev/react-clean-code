import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/error'
import { InvalidFieldError } from '@/validation/error/invalid-field-error'

export class EmailValidator implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (!value || regex.test(String(value).toLocaleLowerCase())) ? null : new InvalidFieldError(this.field)
  }
}
