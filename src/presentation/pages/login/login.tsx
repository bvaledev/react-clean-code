import React, { useState, useEffect } from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
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
            <Link data-testid="register" to="/signup" className={Styles.link}>Criar Conta</Link>

            <FormStatus />
          </form>
        </FormContext.Provider>
        <Footer />
      </div>
    </>
  )
}

export default Login
