import * as mTypes from '../mutation-types.es6';

const state = {
    apiKey: '',
    apiUrl: ''
};

const mutations = {
    [mTypes.SETTINGS_RECEIVED] (state, payload) {
        state.apiKey = payload.api_key;
        state.apiUrl = payload.api_url;
    }
};

// make async requests and only then call sync muttator
const actions = {};

const getters = {};

export default {state, mutations, actions, getters};