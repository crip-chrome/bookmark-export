<template>
  <div>
    <h5>Audit</h5>

    <table class="table">
      <thead>
      <tr>
        <td>#</td>
        <td>Type</td>
        <td>Event</td>
        <td>Title</td>
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

  table {
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
  }

  tbody {
    color: rgba(255, 255, 255, 0.4);
  }

  th {
    color: rgba(255, 255, 255, 0.7);
    font-size: 15px;
    font-weight: 500;
  }

  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .table > tbody > tr > td,
  .table > tbody > tr > th,
  .table > tfoot > tr > td,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > thead > tr > th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .table > caption + thead > tr:first-child > td,
  .table > caption + thead > tr:first-child > th,
  .table > colgroup + thead > tr:first-child > td,
  .table > colgroup + thead > tr:first-child > th,
  .table > thead:first-child > tr:first-child > td,
  .table > thead:first-child > tr:first-child > th {
    border-top: 0;
  }

  .table > thead > tr > th {
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }
</style>
