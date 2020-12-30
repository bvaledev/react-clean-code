import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test/validation'
import faker from 'faker'
import Login from './login'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    validationStub,
    authenticationSpy
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

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut({ validationError: null })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('✅')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut({ validationError: null })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('✅')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut({ validationError: null })

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = sut.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut({ validationError: null })

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = sut.getByTestId('submit-btn') as HTMLButtonElement
    fireEvent.click(submitButton)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut({ validationError: null })

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit-btn') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
