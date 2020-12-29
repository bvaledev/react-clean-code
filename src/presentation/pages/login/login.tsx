import React, { useState } from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <>
      <div className={Styles.login}>
        <LoginHeader />
        <FormContext.Provider value={state} >
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
