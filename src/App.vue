<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {auth} from './services'

  @Component({name: 'app'})
  export default class App extends Vue {

    /**
     * Check user authorization when component instance is created and redirect
     * to correct page.
     * @return {void}
     */
    async created() {
      await auth.check()
    }
  }
</script>
