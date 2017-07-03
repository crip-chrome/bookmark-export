import Service from '../services/Service'

import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export interface IBookmarks {
  getChild(id?: number): Promise<Array<BookmarkTreeNode>>
}

export class Bookmarks extends Service implements IBookmarks {
  constructor() {
    super('Api.Bookmarks')
  }

  /**
   * Get bookmark child nodes by id.
   * @param  {Number} id
   * @return {Promise<Array<BookmarkTreeNode>>}
   */
  getChild(id: number = 1): Promise<Array<BookmarkTreeNode>> {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.getChildren(id.toString(), (results) => {
        if (!results) reject('No data')

        resolve(results)
      })
    })
  }
}