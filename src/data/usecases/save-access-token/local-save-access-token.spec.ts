import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test/mock-storage'
import faker from 'faker'

type SutType = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutType => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('Should throws if SetSorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(faker.random.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
