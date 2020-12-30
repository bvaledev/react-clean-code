import { ValidationBuilder } from '@/validation/validation-composite/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'

export const makeLoginValidationFactory = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
