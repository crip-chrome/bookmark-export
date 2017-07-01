import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Api} from './api'
import './scss/styles.scss'

Vue.use(Api)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
