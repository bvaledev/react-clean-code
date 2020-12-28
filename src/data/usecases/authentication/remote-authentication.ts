import { AuthenticationParams } from '../../../domain/usecases/authentication'
import { HttpPostClient } from './remote-authentication-protocols'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (authentication: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: authentication })
  }
}
