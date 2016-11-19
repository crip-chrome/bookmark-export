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
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in audit" :class="{ warning: i.type == 'error' }">
        <td>{{ i.id }}</td>
        <td>{{ i.type }}</td>
        <td>{{ i.interaction }}</td>
        <td>{{ i.title }}</td>
        <td>
          <a href=# v-if="i.type == 'error' && i.interaction != 'sync' && !i.repeated" @click="repeat(i)">Repeat</a>
        </td>
      </tr>
      </tbody>
    </table>
    <p>If extension is newly added or for some reason disabled for a while, please
      <a href=# @click="sync" id="synchronize">synchronize</a> with your blog</p>
  </div>
</template>

<script>
  import chrome from './../store/chrome-storage.es6';
  import settings from './../settings.es6';
  import Api from './../store/modules/api.es6';

  export default {

    mounted() {
      this.loadData();
    },

    data() {
      return {
        audit: []
      }
    },

    methods: {
      loadData() {
        chrome.read(settings.audit_table)
                .then((data) => {
                  this.audit = data;
                  setTimeout(() => this.loadData(), 1000);
                });
      },

      /**
       * @param {AuditEntry} i
       */
      repeat(i) {
        Api.redo(i);
      },

      sync() {
        Api.sync();
      }
    }

  }
</script>

<style>
  tr.warning {
    background-color: rgba(255, 170, 0, 0.15);
  }
</style>
