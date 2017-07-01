<template>
  <div class="bookmarks">
    Bookmarks...
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({name: 'bookmarks'})
  export default class Bookmarks extends Vue {
    mounted() {
      console.log('Bookmarks component mounted.')
    }
  }
</script>
