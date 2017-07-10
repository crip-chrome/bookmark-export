import * as Auth from './Auth'
import * as Storage from './Storage'
import * as Bookmarks from './Bookmarks'

export const storage: Storage.IStorageService = new Storage.LocalStorage()

export const auth: Auth.IAuthService = new Auth.Auth(storage)
export const bookmarks: Bookmarks.IBookmarks = new Bookmarks.Bookmarks(storage)
