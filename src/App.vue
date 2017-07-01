<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {IApi} from './api'
  import router from './router'
  import * as routes from './router/routes'

  @Component({name: 'app'})
  export default class App extends Vue {
    $api: IApi

    /**
     * Call greeter when component instance is created.
     * @return {void}
     */
    async created() {
      let isValidToken = await this.$api.auth.isValidToken('token')
      if (isValidToken) {
        router.push(routes.bookmarks('1'))
        return
      }

      router.push(routes.login())
    }
  }
</script>
