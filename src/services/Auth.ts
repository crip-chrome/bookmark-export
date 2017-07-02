import * as routes from '../router/routes'
import router from '../router'
import Service from './Service'
import {auth} from '../api'
import {IStorageService} from './Storage'

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthService {
  check(): Promise<boolean>
  authorize(credentials: ICredentials): Promise<boolean>
}

export class Auth extends Service implements IAuthService {
  storage: IStorageService

  constructor(storage: IStorageService) {
    super('Services.Auth')
    this.storage = storage
  }

  async check(): Promise<boolean> {
    const isAuthorized = await this.isAuthorized()
    
    if (isAuthorized) {
      router.push(routes.bookmarks('1'))
      return true
    }

    router.push(routes.login())
    return false
  }

  async authorize(credentials: ICredentials): Promise<boolean> {
    let response = await auth.authenticate(credentials)
    let isToken = typeof response === 'string'

    if (isToken) {
      this.log.log('authorize', {response})

      this.storage.saveToken(response as string)
      router.push(routes.bookmarks('1'))
      return true
    }

    throw response
  }

  private async isAuthorized(): Promise<boolean> {
    try {
      const token = this.storage.getToken()
      let isAuthorized = await this.validateToken(token)
      console.log('Services.Auth.isAuthorized()', {isAuthorized, token})

      return isAuthorized
    } catch (error) {
      return false
    }
  }

  private async validateToken(token: string): Promise<boolean> {
    if (!token || token === '') {
      return false
    }

    return await auth.isValidToken(token)
  }
}
