export interface IStorageService {
  saveToken(token: string): void
  getToken(): string
  hasUrl(url: string): boolean
  getUrlState(url: string): Promise<boolean>
  addUrl(url: string, value: boolean)

  saveConfigUrl(url: string): void
  getConfigUrl(): string
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
  private readonly confUrlKey = 'crip_bookmark_conf_url'

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

      /*console.log({
        now,
        added,
        minus: now - added,
        isoutdated: now - added > 100000
      })*/
      return now - added > 100000
    }

    return false
  }

  /**
   * Get url state from storage.
   * @param   {String} url
   * @returns {Boolean}
   */
  async getUrlState(url: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let urls = this.getUrls()
      resolve(urls[url].exists)
    })
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

  /**
   * Save configuration url in local storage.
   * @param  {String} url
   * @return {void}
   */
  saveConfigUrl(url: string): void {
    localStorage.setItem(this.confUrlKey, url)
  }

  /**
   * Get configuration url from local storage.
   * @return {String}
   */
  getConfigUrl(): string {
    let token = localStorage.getItem(this.confUrlKey)
    if (token) return token

    return 'http://hrefs.crip.lv/api'
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
