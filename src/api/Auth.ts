import axios, {AxiosResponse} from 'axios'

import Service from '../services/Service'
import * as Storage from '../services/Storage'

export interface ICredentials {
  /**
   * User email address.
   */
  email: string

  /**
   * User password.
   */
  password: string
}

export interface IAuthError {
  /**
   * Authentication error code.
   */
  error: string
}

export interface IAuth {
  /**
   * Validate token in server API.
   * @param  {string} token
   * @return {Promise<boolean>}
   */
  isValidToken(token: string): Promise<boolean>

  /**
   * Authenticate user in server API.
   * @param  {ICredentials} credentials
   * @return {Promise<string | IAuthError>}
   */
  authenticate(credentials: ICredentials): Promise<string | IAuthError>
}

export class Auth extends Service implements IAuth {
  /**
   * Base URL of auth API.
   */
  private url: string

  /**
   * Construct Auth api service instance.
   */
  constructor() {
    super('Api.Auth')
    let storage = new Storage.LocalStorage()
    this.url = storage.getConfigUrl()
  }

  /**
   * Validate token in server API.
   * @param  {string} token
   * @return {Promise<boolean>}
   */
  async isValidToken(token: string): Promise<boolean> {
    try {
      let response = await axios.get(`${this.url}/href`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.log.log('isValidToken', {response})

      // success to request server with auth token header
      return true
    } catch (error) {
      // we got error while requesting server, so we can assume that token is
      // expired or some other issue occurred and user re-login
      return false
    }
  }

  /**
   * Authenticate user in server API.
   * @param  {ICredentials} credentials
   * @return {Promise<string | IAuthError>}
   */
  async authenticate(credentials: ICredentials): Promise<string | IAuthError> {
    try {
      let response = await axios.post(`${this.url}/login`, credentials)
      return (<AxiosResponse>response).data.token
    } catch (error) {
      if (error.response.status === 422) {
        return error.response.data as IAuthError
      }
      // this is not validation error, so we re-throw it
      throw error
    }
  }
}
