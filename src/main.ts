import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './scss/styles.scss'
import 'font-awesome/scss/font-awesome.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
