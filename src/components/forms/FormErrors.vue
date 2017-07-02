<template>
  <ul class="help-block" v-if="hasErrors">
    <li v-for="error in errors" class="text-danger">{{ error }}</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'form-errors',
    props: {
      errors: {type: Array, default: _ => []}
    }
  })
  export default class FormErrors extends Vue {
    /**
     * Collection of errors to show.
     */
    errors: Array<string>

    /**
     * Determines is there errors in a collection.
     * @return {boolean}
     */
    get hasErrors() {
      return this.errors && this.errors.length > 0
    }
  }
</script>