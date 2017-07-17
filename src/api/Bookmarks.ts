import axios, {AxiosResponse} from 'axios'

import Service from '../services/Service'
import * as Storage from '../services/Storage'

import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

interface IBookmarkData {
  title: string
  url: string
  date: number
}

export interface IBookmarks {
  /**
   * Get bookmark child nodes by id.
   * @param id
   * @return {Promise<BookmarkTreeNode[]>}
   */
  getChildren(id?: string): Promise<BookmarkTreeNode[]>

  /**
   * Get bookmark node by identifier.
   * @param  {String} id
   * @return {Promise<BookmarkTreeNode>}
   */
  get(id?: string): Promise<BookmarkTreeNode>

  /**
   * Determines is the bookmark registered in CRIP system.
   * @param  {String} url
   * @return {Promise<boolean>}
   */
  isRegistered(url: string): Promise<boolean>

  /**
   * Save bookmark on the server.
   * @param {IBookmarkData} bookmark
   * @param {Array<String>} tags
   * @return {Promise<boolean>}
   */
  save(bookmark: IBookmarkData, tags: string[]): Promise<boolean>
}

export class Bookmarks extends Service implements IBookmarks {
  /**
   * Local storage instance.
   * @type IStorageService
   */
  private readonly storage: Storage.IStorageService

  /**
   * Base URL of auth API.
   * @type String
   */
  private readonly url: string

  /**
   * Construct Bookmarks api service instance.
   */
  constructor() {
    super('Api.Bookmarks')
    this.storage = new Storage.LocalStorage()
    this.url = this.storage.getConfigUrl()
  }

  /**
   * Get token header object for a request.
   * @returns {{headers: {Authorization: string}}}
   */
  get tokenHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.storage.getToken()}`
      }
    }
  }

  /**
   * Get bookmark child nodes by id.
   * @param id
   * @return {Promise<BookmarkTreeNode[]>}
   */
  getChildren(id: string = '1'): Promise<BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.getChildren(id, (results) => {
        this.log.log('getChildren', {results})

        if (!results) {
          reject('No data')
          return
        }

        resolve(results)
      })
    })
  }

  /**
   * Get bookmark node by identifier.
   * @param  {String} id
   * @return {Promise<BookmarkTreeNode>}
   */
  get(id: string): Promise<BookmarkTreeNode> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.get(id, (results) => {
        this.log.log('get', {result: results[0]})

        if (!results[0]) {
          reject('No data')
          return
        }

        resolve(results[0])
      })
    })
  }

  /**
   * Determines is the bookmark registered in CRIP system.
   * @param  {String} url
   * @return {Promise<boolean>}
   */
  async isRegistered(url: string): Promise<boolean> {
    try {
      let requestUrl = `${this.url}/href/exists?url=${encodeURIComponent(url)}`
      let response = await axios.get(requestUrl, this.tokenHeader) as AxiosResponse

      this.log.log('isRegistered', {response, url})

      return response.data
    } catch (error) {
      return false
    }
  }

  /**
   * Save bookmark on the server.
   * @param {IBookmarkData} bookmark
   * @param {Array<String>} tags
   * @return {Promise<boolean>}
   */
  async save(bookmark: IBookmarkData, tags: string[]): Promise<boolean> {
    try {
      let requestUrl = `${this.url}/href/create`
      let data = {...bookmark, tags}
      let response = await axios.post(requestUrl, data, this.tokenHeader)

      this.log.log('isRegistered', {response, requestUrl})
      return true
    } catch (error) {
      return false
    }
  }
}