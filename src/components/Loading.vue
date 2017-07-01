<template>
  <div class="loading">
    <div class="loader">
      <rotate-loader></rotate-loader>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import RotateLoader from 'vue-spinner/src/RotateLoader.vue'

  @Component({
    name: 'loading',
    components: {RotateLoader: (<any>RotateLoader)}
  })
  export default class Loading extends Vue {
    mounted() {
      console.log('loading component mounted.')
    }
  }
</script>

<style scoped>
  .loading {
    text-align: center;
    padding: 200px 0;
  }
</style>
