import Vue from 'vue';
import Vuex from 'vuex';

import count from './modules/count.es6';
import sync from './modules/sync.es6';
import settings from './modules/settings.es6';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {count, sync, settings}
});