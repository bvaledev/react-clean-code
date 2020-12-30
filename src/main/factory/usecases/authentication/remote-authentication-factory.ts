import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factory/http/axios-http-client-factory'
import { makeApiUrlFactory } from '../../http/api-url-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrlFactory('/login'), makeAxiosHttpClient())
}
