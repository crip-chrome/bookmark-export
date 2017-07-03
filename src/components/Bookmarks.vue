<template>
  <div class="bookmarks">
    Bookmarks...
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {bookmarks} from '../api'

  @Component({name: 'bookmarks'})
  export default class Bookmarks extends Vue {
    async created() {
      let list = await bookmarks.getChild()
      console.log({list})
    }

    mounted() {
      console.log('Bookmarks component mounted.')
    }
  }
</script>
