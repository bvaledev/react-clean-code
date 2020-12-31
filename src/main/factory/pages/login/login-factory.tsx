import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'
import { makeLoginValidationFactory } from './login-validation-factory'
import { makeSaveAccessTokenFactory } from '@/main/factory/usecases/save-access-token/save-access-token-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidationFactory()}
      authentication={makeRemoteAuthentication()}
      saveAccessToken={makeSaveAccessTokenFactory()}
    />
  )
}
