<template>
  <div>
    <h5>Audit</h5>

    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>Event</th>
        <th>Title</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in audit" :class="{ warning: item.type == 'error' }">
        <td>{{ item.id }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.interaction }}</td>
        <td>{{ item.title }}</td>
      </tr>
      </tbody>
    </table>
    <p>If extension is newly added or for some reason disabled for a while, please
      <a href="#" id="synchronize">synchronize</a> with your blog</p>
  </div>
</template>

<script>
  import chrome from './../store/chrome-storage.es6';
  import settings from './../settings.es6';

  export default {

    mounted() {
      chrome.read(settings.audit_table)
              .then((data) => this.audit = data);
    },

    data() {
      return {
        audit: []
      }
    }

  }
</script>

<style>
  tr.warning {
    background-color: rgba(255, 170, 0, 0.15);
  }
</style>
