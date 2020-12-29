import React, { useState, useEffect } from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}
const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email)
    })
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <>
      <div className={Styles.login}>
        <LoginHeader />
        <FormContext.Provider value={{ state, setState }} >
          <form className={Styles.form}>
            <h2>Login</h2>

            <Input type="email" name="email" placeholder="digite seu e-mail" />

            <Input type="password" name="password" placeholder="digite sua senha" />

            <button data-testid="submit-btn" disabled className={Styles.submit} type="submit">Entrar</button>
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
