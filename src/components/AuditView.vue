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
      <tr v-for="i in audit" :class="{ warning: i.type == 'error' }">
        <td>{{ i.id }}</td>
        <td>{{ i.type }}</td>
        <td>{{ i.interaction }}</td>
        <td>{{ i.title }}</td>
      </tr>
      </tbody>
    </table>
    <p>If extension is newly added or for some reason disabled for a while, please
      <a href="#" @click="sync" id="synchronize">synchronize</a> with your blog</p>
  </div>
</template>

<script>
  import {sync} from '../api/blog'
  import {getLogs} from '../api/db'

  export default {

    mounted () {
      this.loadData()
    },

    data () {
      return {
        audit: []
      }
    },

    methods: {
      /**
       * Load audit data from storage.
       */
      loadData () {
        getLogs(10).then(logs => {
          this.audit = logs
          setTimeout(() => this.loadData(), 1000)
        })
      },

      /**
       * Full sync with blog.
       */
      sync () {
        sync()
      }
    }
  }
</script>

<style>
  tr.warning {
    background-color: rgba(255, 170, 0, 0.15);
  }
</style>
