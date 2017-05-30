import Vue from 'vue'
import App from './components/App.vue'
import router from './router'

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  render: h => h(App)
})

// expose the app and the router.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export {app, router}
