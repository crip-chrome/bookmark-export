import Vue from 'vue'
import {IStorage} from './Storage'

export interface ISession {
  check(): Promise<boolean>
}

export module Crip.Auth {

  export class Session implements ISession {
    storage: IStorage

    constructor(storage: IStorage) {
      this.storage = storage
    }

    async check(): Promise<boolean> {
      try {
        const token = this.storage.getToken()
        return true
      } catch (error) {
        return false
      }
    }

    private async validateToken(token: string): Promise<boolean> {
      return undefined
    }
  }

}