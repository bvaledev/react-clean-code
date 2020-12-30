import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'
import { Router } from '@/presentation/components'
import { makeLogin } from './factory/pages/login/login-facotry'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
