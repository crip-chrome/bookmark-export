import * as mTypes from '../mutation-types'
import settings from './settings'

const state = {
  apiKey: '',
  apiUrl: ''
}

const mutations = {
  [mTypes.SETTINGS_RECEIVED] (state, payload) {
    state.apiKey = payload[settings.key]
    state.apiUrl = payload[settings.url]
  }
}

// make async requests and only then call sync muttator
const actions = {}

const getters = {}

export default {state, mutations, actions, getters}
