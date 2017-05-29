import * as mTypes from '../mutation-types.es6';
import * as aTypes from '../action-types.es6';

const state = {
    count: 0
};

const mutations = {
    [mTypes.increment] (state) {
        state.count++;
    }
};

// make async requests and only then call sync muttator
const actions = {
    [aTypes.increment] (state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                state.commit(mTypes.increment);
                resolve(state.count);
            }, 1000);
        });
    }
};

const getters = {
    // store.getters.count
    count: (state, getters) => {
        return state.count;
    }
};

export default {state, mutations, actions, getters};