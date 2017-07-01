import * as Auth from './Auth'
import * as Storage from './Storage'

export const storage: Storage.IStorageService = new Storage.LocalStorage()

export const auth: Auth.IAuthService = new Auth.Auth(storage)
