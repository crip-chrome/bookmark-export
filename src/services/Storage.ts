export interface IStorageService {
  saveToken(token: string): void
  getToken(): string
  hasUrl(url: string): boolean
  getUrlState(url: string): boolean
  addUrl(url: string, value: boolean)
}

interface UrlMap {
  [s: string]: boolean
}

export class LocalStorage implements IStorageService {
  private readonly tokenKey = 'crip_bookmark_token'
  private readonly urlsKey = 'crip_bookmark_urls'

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

  hasUrl(url: string): boolean {
    let urls = this.getUrls()
    return typeof urls[url] !== 'undefined'
  }

  getUrlState(url: string): boolean {
    let urls = this.getUrls()
    return urls[url]
  }

  addUrl(url: string, value: boolean) {
    let urls = this.getUrls()
    urls[url] = value
    let urlsStr = JSON.stringify(urls)

    localStorage.setItem(this.urlsKey, urlsStr)
  }

  private hasUrlStr(): boolean {
    let urlsStr = localStorage.getItem(this.urlsKey)
    return !!urlsStr
  }

  private getUrls(): UrlMap {
    if (this.hasUrlStr()) {
      return JSON.parse(localStorage.getItem(this.urlsKey)) as UrlMap
    }

    return {} as UrlMap
  }
}
