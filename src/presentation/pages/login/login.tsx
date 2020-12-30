import React, { useState, useEffect } from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      await authentication.auth({
        email: state.email,
        password: state.password
      })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <>
      <div className={Styles.login}>
        <LoginHeader />
        <FormContext.Provider value={{ state, setState }} >
          <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>

            <Input type="email" name="email" placeholder="digite seu e-mail" />

            <Input type="password" name="password" placeholder="digite sua senha" />

            <button data-testid="submit-btn" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
            <span className={Styles.link}>Criar Conta</span>

            <FormStatus />
          </form>
        </FormContext.Provider>
        <Footer />
      </div>
    </>
  )
}

export default Login
