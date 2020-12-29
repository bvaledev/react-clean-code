import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test/validation'
import faker from 'faker'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Page', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut, validationStub } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❌')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('❌')
  })

  // test('Should start with initial state', () => {
  //   const validationError = 'Campo Obrigatório'
  //   const { sut, validationStub } = makeSut({ validationError })
  //   const errorWrap = sut.getByTestId('error-wrap')
  //   expect(errorWrap.childElementCount).toBe(0)
  //   const submitButton = sut.getByTestId('submit-btn') as HTMLButtonElement
  //   expect(submitButton.disabled).toBe(true)
  //   const emailStatus = sut.getByTestId('email-status')
  //   expect(emailStatus.title).toBe('Campo Obrigatório')
  //   expect(emailStatus.textContent).toBe('❌')
  //   const passwordStatus = sut.getByTestId('password-status')
  //   expect(passwordStatus.title).toBe('Campo Obrigatório')
  //   expect(passwordStatus.textContent).toBe('❌')
  // })

  // test('Should call Validation with correct value email', () => {
  //   const { sut, validationStub } = makeSut()
  //   const email = faker.internet.email()
  //   const emailInput = sut.getByTestId('email')
  //   fireEvent.input(emailInput, { target: { value: email } })
  //   expect(validationStub.fieldName).toBe('email')
  //   expect(validationStub.fieldValue).toBe(email)
  // })

  // test('Should call Validation with correct value password', () => {
  //   const { sut, validationStub } = makeSut()
  //   const password = faker.internet.password()
  //   const passwordInput = sut.getByTestId('password')
  //   fireEvent.input(passwordInput, { target: { value: password } })
  //   expect(validationStub.fieldName).toBe('password')
  //   expect(validationStub.fieldValue).toBe(password)
  // })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const errorMessage = faker.random.words()
    validationStub.errorMessage = errorMessage
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❌')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const errorMessage = faker.random.words()
    validationStub.errorMessage = errorMessage
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('❌')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    const errorMessage = faker.random.words()
    validationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('✅')
  })
})
