import React from 'react'
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <>
      <div className={Styles.login}>
        <LoginHeader />
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="digite seu e-mail" />

          <Input type="password" name="password" placeholder="digite sua senha" />

          <button className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar Conta</span>

          <FormStatus />
        </form>
        <Footer />
      </div>
    </>
  )
}

export default Login
