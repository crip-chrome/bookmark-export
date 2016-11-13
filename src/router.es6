import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import managementView from './components/ManagementView.vue';
import settingsView from './components/SettingsView.vue';

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/management', name: 'management', component: managementView},
        {path: '/settings', name: 'settings', component: settingsView},
        {path: '*', redirect: '/management'}
    ]
})