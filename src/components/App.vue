<template>
  <div>
    <nav>
      <h4 class="pull-left">CRIP chrome bookmark export</h4>
      <router-link v-if="managementView" to="/settings" class="btn btn-purple pull-right">Settings</router-link>
      <router-link v-if="settingsView" to="/management" class="btn btn-purple pull-right">Management</router-link>
    </nav>

    <div class="clearfix">
      <!--<example></example>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  //import Example from './Example.vue';
  export default {
    mounted() {
      console.log('Component ready.')
    },
    computed: {
      managementView() {
        return this.$route.name == 'management';
      },
      settingsView() {
        return this.$route.name == 'settings';
      }
    },
    components: {
      // Example
    }
  }
</script>

<style>

</style>