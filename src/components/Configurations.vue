<template>
  <div class="configurations panel panel-primary">
    <div class="panel-heading">
      <span>Configurations</span>
      <router-link :to="bookmarksRoute" class="pull-right white">
        Bookmarks
      </router-link>
    </div>

    <form class="panel-body form-horizontal" @submit.prevent="save">
      <form-group label="Url" target="url">
        <input
            type="url" name="url" id="url" class="form-control"
            v-model="form.url" placeholder="http://hrefs.crip.lv/" required
        />
      </form-group>

      <form-group control-class="col-sm-8 col-md-offset-3 col-sm-offset-4">
        <button type="submit" class="btn btn-primary">Save</button>
      </form-group>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  import * as routes from '../router/routes'
  import FormGroup from './forms/FormGroup.vue'
  import {storage} from '../services'

  @Component({
    name: 'configurations',
    components: {FormGroup}
  })
  export default class Configurations extends Vue {
    mounted() {
      console.log('Configurations component mounted.')
      this.form.url = storage.getConfigUrl() as ""
    }

    /**
     * Bookmarks route location.
     * @type {Location}
     */
    bookmarksRoute = routes.bookmarks('1')

    /**
     * Form fields.
     * @type {Object}
     */
    form = {
      url: ''
    }

    /**
     * Save configurations.
     * @return {Promise.<void>}
     */
    async save() {
      storage.saveConfigUrl(this.form.url)
    }
  }
</script>

<style lang="scss">
  @import "./../scss/variables";

  .configurations {
    margin: -1px;

    .panel-heading a {
      color: white;
    }
  }
</style>
