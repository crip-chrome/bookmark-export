<template>
  <div class="panel bookmarks panel-primary">
    <div class="panel-heading">
      <span>Bookmarks</span>
    </div>
    <div class="panel-body">
      <breadcrumb></breadcrumb>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
        <tr>
          <th>#</th>
          <th>Date created</th>
          <th>Title</th>
          <th>Url</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="bookmark in bookmarks" :key="bookmark.id"
            @click="open(bookmark)"
        >
          <td>{{ bookmark.id }}</td>
          <td>{{ date(bookmark.dateAdded) }}</td>
          <td class="table-wide">{{ bookmark.title }}</td>
          <td class="table-wide">{{ bookmark.url }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {bookmarks} from '../api'
  import Breadcrumb from './Breadcrumb.vue'

  import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode

  @Component({
    name: 'bookmarks',
    components: {Breadcrumb}
  })
  export default class Bookmarks extends Vue {

    bookmarks: Array<BookmarkTreeNode> = []

    parents: Array<BookmarkTreeNode> = [{title: 'Root', id: '1'}]

    async created() {
      this.getBookmarks()
    }

    mounted() {
      console.log('Bookmarks component mounted.')
    }

    date(timestamp: number) {
      return new Date(timestamp).toISOString().slice(0, 10)
    }

    open(bookmark: BookmarkTreeNode) {
      if (bookmark.url) return
      this.parents.push(bookmark)
    }

    async getBookmarks(parentId = '1') {
      this.bookmarks = await bookmarks.getChildren(parentId)
    }
  }
</script>

<style>
  .bookmarks {
    margin: -1px;
  }

  .table-wide {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .breadcrumb-item {
    color: white;
  }
</style>
