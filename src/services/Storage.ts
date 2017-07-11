export interface IStorageService {
  saveToken(token: string): void
  getToken(): string
  hasUrl(url: string): boolean
  getUrlState(url: string): boolean
  addUrl(url: string, value: boolean)
}

interface UrlInfo {
  exists: boolean
  addedAt: number
}

interface UrlMap {
  [s: string]: UrlInfo
}

export class LocalStorage implements IStorageService {
  private readonly tokenKey = 'crip_bookmark_token'
  private readonly urlsKey = 'crip_bookmark_urls'

  /**
   * Save token in to local storage.
   * @param {String} token
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  /**
   * Get token from local storage.
   * @return {String}
   */
  getToken(): string {
    let token = localStorage.getItem(this.tokenKey)
    if (token) return token

    throw new Error('Token is not provided')
  }

  /**
   * Check url existence in storage.
   * @param   {String} url
   * @returns {Boolean}
   */
  hasUrl(url: string): boolean {
    let urls = this.getUrls()

    if (typeof urls[url] !== 'undefined') {
      let now = new Date().getTime()
      let added = urls[url].addedAt

      return now - added > 100000
    }

    return false
  }

  /**
   * Get url state from storage.
   * @param   {String} url
   * @returns {Boolean}
   */
  getUrlState(url: string): boolean {
    let urls = this.getUrls()
    return urls[url].exists
  }

  /**
   * Add url to storage.
   * @param   {String} url
   * @param   {Boolean} value
   * @returns {void}
   */
  addUrl(url: string, value: boolean): void {
    let urls = this.getUrls()
    urls[url] = {
      exists: value,
      addedAt: new Date().getTime(),
    }
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

    return {}
  }
}
