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

    <div id="status">{{ status }}</div>

    <button type="submit" class="btn btn-purple" v-on:click="save">Save</button>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        apiUrl: 'apiUrl',
        apiKey: 'apiKey'
      }
    },
    methods: {
      save() {
        console.log(this.apiUrl, this.apiKey);
      }
    },
    components: {}
  }
</script>

<style>

</style>