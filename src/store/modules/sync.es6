import * as mTypes from '../mutation-types.es6';
import * as aTypes from '../action-types.es6';

const state = {
    synchronizations: []
};

const mutations = {};

// make async requests and only then call sync muttator
const actions = {};

const getters = {
    failedSyncs: (state, getters) => {
        return state.synchronizations.filter(x => !x.success);
    },

    failedSyncsCount: (state, getters) => {
        return getters.failedSyncs.length;
    },

    successfulSyncs: (state, getters) => {
        return state.synchronizations.filter(x => x.success);
    }
};

export default {state, mutations, actions, getters};