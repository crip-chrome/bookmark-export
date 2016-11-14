<template>
  <div>
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
  </div>
</template>

<script>
  import chrome from './../store/chrome-storage.es6';
  import * as mTypes from './../store/mutation-types.es6';

  export default {
    mounted() {
      chrome.get(['api_key', 'api_url'])
              .catch(() => this.showError('Settings could not be loaded. Please try later.'))
              .then((result) => {
                this.$store.commit(mTypes.SETTINGS_RECEIVED, result);
                this.apiUrl = result.api_url;
                this.apiKey = result.api_key;
              });
    },

    computed: {

      hasMessage() {
        return this.message !== '';
      }

    },

    data() {
      return {
        apiUrl: '',
        apiKey: '',
        message: '',
        isSuccessMsg: true//'success' // or 'error'
      }
    },

    methods: {

      save() {
        var data = {api_url: this.apiUrl, api_key: this.apiKey};
        chrome.set(data)
                .catch(() => this.showError('Settings could not be saved. Please try later.'))
                .then(() => {
                  this.$store.commit(mTypes.SETTINGS_RECEIVED, data);
                  this.message = 'Settings successfully saved.';
                  this.isSuccessMsg = true;
                });
      },

      showError(msg) {
        this.message = msg;
        this.isSuccessMsg = false;
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