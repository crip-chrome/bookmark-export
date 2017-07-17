<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span>Login</span>
      <router-link :to="configRoute" class="pull-right" title="Settings">
        <i class="fa fa-cogs white"></i>
      </router-link>
    </div>
    <form class="panel-body form-horizontal" @submit.prevent="login">
      <form-group :errors="errors" label="Email" target="email">
        <input
            type="email" name="email" id="email" class="form-control"
            v-model="form.email" placeholder="Email address" required
        />
      </form-group>

      <form-group label="Password" target="password">
        <input
            type="password" name="password" id="password"
            class="form-control" v-model="form.password"
            placeholder="Password" required
        />
      </form-group>

      <form-group
          control-class="col-sm-8 col-md-offset-3 col-sm-offset-4"
      >
        <button type="submit" class="btn btn-primary">
          Login
          <i
              v-if="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw"
          ></i>
        </button>
      </form-group>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import * as routes from '../router/routes'
  import FormGroup from './forms/FormGroup.vue'
  import {auth} from '../services'

  @Component({
    name: 'login',
    components: {FormGroup}
  })
  export default class Login extends Vue {
    mounted() {
      console.log('Login component mounted.')
    }

    /**
     * Form fields.
     * @type {Object}
     */
    form = {
      email: '',
      password: '',
    }

    /**
     * Configuration component route.
     * @type {Location}
     */
    configRoute = routes.config()

    /**
     * Collection of the errors.
     * @type {Array<String>}
     */
    errors = []

    /**
     * Is current form loading at this moment.
     * @type {Boolean}
     */
    loading = false

    /**
     * Authorize user in CRIP system.
     * @returns {Promise.<void>}
     */
    async login() {
      this.loading = true
      this.errors = []

      try {
        await auth.authorize(this.form)
      } catch (errors) {
        this.errors = ['These credentials do not match our records.']
      }

      this.loading = false
    }
  }
</script>

<style scoped>
  .login {
    padding-top: 20px;
  }

  .fa {
    font-size: 19px;
  }
</style>
