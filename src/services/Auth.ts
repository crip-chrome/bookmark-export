import * as routes from '../router/routes'
import router from '../router'
import Service from './Service'
import {auth} from '../api'
import {IStorageService} from './Storage'

export interface ICredentials {
  /**
   * User email.
   */
  email: string

  /**
   * User password.
   */
  password: string
}

export interface IAuthService {
  /**
   * Authorised user token.
   * @return {String}
   */
  token: string

  /**
   * Check user authorization state and redirect to correct route.
   * @return {Promise<boolean>}
   */
  check(): Promise<boolean>

  /**
   * Authorize user and redirect to bookmarks in case of success.
   * @param  {ICredentials} credentials
   * @return {Promise<boolean>}
   */
  authorize(credentials: ICredentials): Promise<boolean>
}

export class Auth extends Service implements IAuthService {
  storage: IStorageService

  /**
   * Construct Auth service instance.
   * @param {IStorageService} storage
   */
  constructor(storage: IStorageService) {
    super('Services.Auth')
    this.storage = storage
  }

  /**
   * Authorised user token.
   * @return {String}
   */
  get token() {
    return this.storage.getToken()
  }

  /**
   * Check user authorization state and redirect to correct route.
   * @return {Promise<boolean>}
   */
  async check(): Promise<boolean> {
    const isAuthorized = await this.isAuthorized()

    if (isAuthorized) {
      router.push(routes.bookmarks('1'))
      return true
    }

    router.push(routes.login())
    return false
  }

  /**
   * Authorize user and redirect to bookmarks in case of success.
   * @param  {ICredentials} credentials
   * @return {Promise<boolean>}
   */
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

  /**
   * Check user authorization status.
   * @return {Promise<boolean>}
   */
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

  /**
   * Check token status.
   * @param  {string} token
   * @return {Promise<boolean>}
   */
  private async validateToken(token: string): Promise<boolean> {
    if (!token || token === '') {
      return false
    }

    return await auth.isValidToken(token)
  }
}
