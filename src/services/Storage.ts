export interface IStorageService {
  saveToken(token: string): void
  getToken(): string
}

export class LocalStorage implements IStorageService {
  private tokenKey = 'crip_bookmark_token'

  /**
   * Save token in to local storage.
   * @param {string} token
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  /**
   * Get token from local storage.
   * @return {string}
   */
  getToken(): string {
    let token = localStorage.getItem(this.tokenKey)
    if (token) return token

    throw new Error('Token is not provided')
  }
}
