import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'
import { ValidationBuilder } from '@/validation/validation-composite/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClientAdapter()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      validation={validationComposite}
      authentication={remoteAuthentication}
    />
  )
}
