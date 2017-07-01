import axios from 'axios'

export interface IAuth {
  isValidToken(token: string): Promise<boolean>
}

export class Auth implements IAuth {
  private url: string

  constructor() {
    // TODO: get URL value from configuration as it may change in any moment
    this.url = 'http://hrefs.crip.lv/api/chrome'
  }

  async isValidToken(token: string): Promise<boolean> {
    try {
      await axios.get(`${this.url}/validate`, {
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
}
