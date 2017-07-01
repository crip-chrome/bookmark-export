<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {IApi} from './api'
  import Component from 'vue-class-component'

  @Component({name: 'app-custom-name'})
  export default class App extends Vue {
    $api: IApi

    /**
     * Call greeter when component instance is created.
     * @return {void}
     */
    created() {
      this.greet()
      this.$api.auth.isValidToken('token')
    }

    /**
     * Computes component message body.
     * @return {string}
     */
    get message() {
      return `Welcome to CRIP bookmarks export application.`
    }

    /**
     * Greets user in a console.
     * @return {void}
     */
    greet() {
      console.log(this.message)
    }
  }
</script>
