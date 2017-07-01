import * as routes from '../router/routes'
import router from '../router'
import {auth} from '../api'
import {IStorageService} from './Storage'

export interface IAuthService {
  check(): Promise<boolean>
}

export class Auth implements IAuthService {
  storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async check(): Promise<boolean> {
    const isAuthorized = await this.isAuthorized()
    if (isAuthorized) {
      router.push(routes.bookmarks('1'))
    }

    router.push(routes.login())
    return isAuthorized
  }

  private async isAuthorized(): Promise<boolean> {
    try {
      const token = this.storage.getToken()
      return this.validateToken(token)
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
