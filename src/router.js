import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import auditView from './components/AuditView.vue';
import settingsView from './components/SettingsView.vue';

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/audit', name: 'audit', component: auditView},
        {path: '/settings', name: 'settings', component: settingsView},
        {path: '*', redirect: '/audit'}
    ]
})