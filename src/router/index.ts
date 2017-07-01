import Vue from 'vue'
import Router from 'vue-router'

import Loading from '../components/Loading.vue'
import Login from '../components/Login.vue'
import Bookmarks from '../components/Bookmarks.vue'

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
      path: '/login',
      name: 'bookmarks',
      component: Bookmarks
    },
  ]
})
