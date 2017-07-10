import Service from '../services/Service'

import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

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
}

export class Bookmarks extends Service implements IBookmarks {
  constructor() {
    super('Api.Bookmarks')
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
  isRegistered(url: string): Promise<boolean> {
    return undefined
  }
}