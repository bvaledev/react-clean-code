import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'
import faker from 'faker'

type SutType = {
  sut: LocalSaveAccessToken
  setStorage: SetStorageSpy
}

const makeSut = (): SutType => {
  const setStorage = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorage)
  return {
    sut,
    setStorage
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorage } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
