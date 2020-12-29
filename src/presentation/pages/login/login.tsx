import React, { useState } from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <>
      <div className={Styles.login}>
        <LoginHeader />
        <FormContext.Provider value={{ state, errorState }} >
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
