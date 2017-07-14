import Vue from 'vue'
import Router from 'vue-router'

import Loading from '../components/Loading.vue'
import Login from '../components/Login.vue'
import Bookmarks from '../components/Bookmarks.vue'
import Config from '../components/Configurations.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/bookmarks/:page',
      name: 'bookmarks',
      component: Bookmarks
    }, {
      path: '/config',
      name: 'config',
      component: Config
    },
  ]
})
