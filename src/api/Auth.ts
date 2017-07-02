import axios, {AxiosResponse} from 'axios'

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthError {
  error: string
}

export interface IAuth {
  isValidToken(token: string): Promise<boolean>
  authenticate(credentials: ICredentials): Promise<string | IAuthError>
}

export class Auth implements IAuth {
  private url: string

  constructor() {
    // TODO: get URL value from configuration as it may change in any moment
    this.url = 'http://href.dev/api'
  }

  async isValidToken(token: string): Promise<boolean> {
    try {
      await axios.get(`${this.url}/href`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // success to request server with auth token header
      return true
    } catch (error) {
      // we got error while requesting server, so we can assume that token is
      // expired or some other issue occurred and user re-login
      return false
    }
  }

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
