<template>
  <div class="login container">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading">Login</div>
          <form class="panel-body form-horizontal" @submit.prevent="login">
            <form-group :errors="errors.email" label="Email" target="email">
              <input
                  type="email" name="email" id="email" class="form-control"
                  v-model="form.email" placeholder="Email address"
              />
            </form-group>

            <form-group
                :errors="errors.password" label="Password" target="password"
            >
              <input
                  type="password" name="password" id="password"
                  class="form-control" v-model="form.password"
                  placeholder="Password"
              />
            </form-group>

            <form-group
                control-class="col-sm-8 col-md-offset-3 col-sm-offset-4"
            >
              <input type="submit" value="Login" class="btn btn-primary"/>
            </form-group>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

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

    form = {
      email: '',
      password: '',
    }

    errors = {
      email: [],
      password: []
    }

    async login() {
      try {
        await auth.authorize(this.form)
      } catch (errors) {
        this.errors = errors
      }
    }
  }
</script>

<style scoped>
  .login {
    padding-top: 20px;
  }
</style>
