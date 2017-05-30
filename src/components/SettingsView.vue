<template>
  <form @submit.prevent="save">
    <h5>Settings</h5>

    <div class="form-group">
      <label class="control-label col-2" for="api-url">API url</label>
      <div class="col-10">
        <input type="text" id="api-url" class="form-control" v-model="apiUrl"/>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-2" for="api-key">API key</label>
      <div class="col-10">
        <input type="text" id="api-key" class="form-control" v-model="apiKey"/>
      </div>
    </div>

    <div class="status" v-if="hasMessage" :class="{ error: !isSuccessMsg, success: isSuccessMsg }">{{ message }}</div>

    <button type="submit" class="btn btn-purple" @click="save">Save</button>
  </form>
</template>

<script>
  import {getSettings, saveSettings} from '../api/db'

  export default {
    mounted () {
      getSettings({'api_key': '', 'api_url': ''}).then((settings) => {
        this.apiUrl = settings.api_url
        this.apiKey = settings.api_key
      })
    },

    computed: {
      /**
       * Determines is there an message presented.
       * @return {boolean}
       */
      hasMessage () {
        return this.message !== ''
      }
    },

    data () {
      return {
        apiUrl: '',
        apiKey: '',
        message: '',
        isSuccessMsg: true
      }
    },

    methods: {

      /**
       * Save settings to local database.
       */
      save () {
        Promise.all([
          saveSettings('api_url', this.apiUrl),
          saveSettings('api_key', this.apiKey)
        ]).then(() => {
          this.message = 'Settings successfully saved.'
          this.isSuccessMsg = true
        }).catch(() => this.showError('Settings could not be saved. Please try later.'))
      },

      /**
       * Show error message.
       * @param msg
       */
      showError (msg) {
        this.message = msg
        this.isSuccessMsg = false
      }
    }
  }
</script>

<style>
  .status {
    font-weight: bold;
    padding-bottom: 10px;
  }

  .status.error {
    color: #ef5350;
  }

  .status.success {
    color: #00b19d;
  }

</style>