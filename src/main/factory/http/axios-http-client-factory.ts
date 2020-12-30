import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'

export const makeAxiosHttpClient = (): AxiosHttpClientAdapter => {
  return new AxiosHttpClientAdapter()
}
