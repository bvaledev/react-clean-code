import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { makeLocalStorageAdapter } from '@/main/factory/cache/local-storage-adapter-factory'

export const makeSaveAccessTokenFactory = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
