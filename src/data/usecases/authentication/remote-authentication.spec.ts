import { HttpPostClientSpy, RemoteAuthentication } from './remote-authentication-protocols'
import faker from 'faker'
import { mockAuthentication } from '../../../domain/test/mock-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should calls HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpClientSpy.url).toBe(url)
  })

  test('Should calls HttpPostClient with correct body', async () => {
    const url = faker.internet.url()
    const authenticationParams = mockAuthentication()
    const { sut, httpClientSpy } = makeSut()
    await sut.auth(authenticationParams)
    expect(httpClientSpy.body).toEqual(authenticationParams)
  })
})
