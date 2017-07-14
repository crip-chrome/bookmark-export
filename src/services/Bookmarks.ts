import Bookmark from '../models/Bookmark'
import Service from './Service'
import {bookmarks} from '../api'
import {IStorageService} from './Storage'

import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode

export interface IBookmarks {
  /**
   * Get collection of children nodes by bookmark folder identifier.
   * @param  {String} parentId
   * @return {Promise<Bookmark[]>}
   */
  getChildren(parentId: string): Promise<Bookmark[]>

  /**
   * Get collection of parent nodes by bookmark folder identifier.
   * @param  {String} id
   * @return {Promise<Bookmark[]>}
   */
  getTree(id: string): Promise<Bookmark[]>

  /**
   * Determines bookmark existence in CRIP system. Using local storage as proxy
   * to avoid too many requests.
   * @param  {Bookmark} bookmark
   * @return {Promise<boolean>}
   */
  isRegistered(bookmark: Bookmark): Promise<boolean>

  /**
   * Save bookmark in api.
   * @param  {Bookmark} bookmark
   * @return {Promise<void>}
   */
  save(bookmark: Bookmark): Promise<void>
}

export class Bookmarks extends Service implements IBookmarks {
  /**
   * Construct Bookmarks service instance.
   * @param {IStorageService} storage
   */
  constructor(private storage: IStorageService) {
    super('Services.Bookmarks')
    this.storage = storage
  }

  /**
   * Get collection of children nodes by bookmark folder identifier.
   * @param  {String} parentId
   * @return {Promise<Bookmark[]>}
   */
  async getChildren(parentId: string): Promise<Bookmark[]> {
    let bookmarkNodes = await bookmarks.getChildren(parentId)
    let bookmarkList = bookmarkNodes.map(node => new Bookmark(node))

    return bookmarkList.sort(b => b.index)
  }

  /**
   * Get collection of parent nodes by bookmark folder identifier.
   * @param  {String} id
   * @return {Promise<Bookmark[]>}
   */
  async getTree(id: string): Promise<Bookmark[]> {
    let pages = []

    while (parseInt(id) > 1) {
      let bookmarkNode = await bookmarks.get(id)
      let bookmark = new Bookmark(bookmarkNode)
      pages.unshift(bookmark)
      id = bookmark.parentId
    }

    return pages
  }

  /**
   * Determines bookmark existence in CRIP system. Using local storage as proxy
   * to avoid too many requests.
   * @param {Bookmark} bookmark
   */
  async isRegistered(bookmark: Bookmark): Promise<boolean> {
    if (this.storage.hasUrl(bookmark.url)) {
      return this.storage.getUrlState(bookmark.url)
    }

    const state = await bookmarks.isRegistered(bookmark.url)
    this.storage.addUrl(bookmark.url, state)

    return state
  }

  /**
   * Save bookmark in api.
   * @param  {Bookmark} bookmark
   * @return {Promise<void>}
   */
  async save(bookmark: Bookmark): Promise<void> {
    let tree = await this.getTree(bookmark.parentId)
    let tags = tree.map(b => b.title)
    let data = {
      title: bookmark.title,
      url: bookmark.url,
      date: bookmark.dateAdded
    }

    if (await bookmarks.save(data, tags))
      this.storage.addUrl(bookmark.url, true)
  }
}