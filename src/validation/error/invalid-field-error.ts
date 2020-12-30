export class InvalidFieldError extends Error {
  constructor (private readonly fieldName: string) {
    super(`O campo ${fieldName} está incorreto`)
    this.name = 'InvalidFieldError'
  }
}
