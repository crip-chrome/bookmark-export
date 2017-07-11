import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode
import {bookmarks} from '../services'

export default class Bookmark implements BookmarkTreeNode {
  /**
   * Optional. The 0-based position of this node within its parent folder.
   */
  index?: number

  /**
   * Optional. When this node was created, in milliseconds since the epoch
   * (new Date(dateAdded)).
   */
  dateAdded?: number

  /**
   * The text displayed for the node.
   */
  title: string

  /**
   * Optional. The URL navigated to when a user clicks the bookmark. Omitted
   * for folders.
   */
  url?: string

  /**
   * Optional. When the contents of this folder last changed, in milliseconds
   * since the epoch.
   */
  dateGroupModified?: number

  /**
   * The unique identifier for the node. IDs are unique within the current
   * profile, and they remain valid even after the browser is restarted.
   */
  id: string

  /**
   * Optional. The id of the parent folder. Omitted for the root node.
   */
  parentId?: string

  /**
   *  Optional. An ordered list of children of this node.
   */
  children?: BookmarkTreeNode[]

  /**
   * Optional.
   * Since Chrome 37.
   * Indicates the reason why this node is unmodifiable. The managed value
   * indicates that this node was configured by the system administrator or by
   * the custodian of a supervised user. Omitted if the node can be modified by
   * the user and the extension (default).
   */
  unmodifiable?: any

  /**
   * Determines is the current bookmark registered in a CRIP system.
   */
  isRegistered: boolean

  /**
   * Construct Bookmark model instance.
   * @param {BookmarkTreeNode} bookmark
   */
  constructor(bookmark: BookmarkTreeNode) {
    Object.keys(bookmark).forEach(key => {
      this.setProperty(key as keyof BookmarkTreeNode, bookmark[key])
    })

    this.isRegistered = false
    this.checkExistence().then(() => 1)
  }

  /**
   * Determines is the current bookmark of folder type.
   * @returns {boolean}
   */
  get isFolder() {
    return !this.url
  }

  /**
   * Set property value.
   * @param {String} key
   * @param {*} value
   */
  setProperty<K extends keyof Bookmark>(key: K, value: Bookmark[K]) {
    this[key] = value
  }

  /**
   * Check current bookmark existence in CRIP system.
   * @returns {Promise<void>}
   */
  async checkExistence(): Promise<void> {
    if(this.isFolder) return

    this.isRegistered = await bookmarks.isRegistered(this)
  }
}