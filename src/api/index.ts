import {IAuth, Crip as CripAuth} from './Auth'

const auth: IAuth = new CripAuth.Api.Auth()

export const Api = {
  install(Vue) {
    Vue.prototype.$api = {auth}
  }
}

export type IApi = {
  auth: IAuth
}
