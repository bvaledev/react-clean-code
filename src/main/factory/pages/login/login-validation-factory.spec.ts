import { ValidationBuilder } from '@/validation/validation-composite/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'
import { makeLoginValidationFactory } from './login-validation-factory'

describe('Login Validation Factory', () => {
  test('Should make validation composite with correct validation', () => {
    const composite = makeLoginValidationFactory()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
