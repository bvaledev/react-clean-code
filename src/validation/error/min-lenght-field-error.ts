export class MinLenghtFieldError extends Error {
  constructor (field: string, size: number) {
    super(`O campo "${field}" deve ter no mínimo ${size} caracteres`)
    this.name = 'MinLenghtFieldError'
  }
}
