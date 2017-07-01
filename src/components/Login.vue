<template>
  <div class="login">
    Login...
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({name: 'login'})
  export default class Login extends Vue {
    mounted() {
      console.log('Login component mounted.')
    }
  }
</script>
