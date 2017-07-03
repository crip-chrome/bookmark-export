<template>
  <div class="panel bookmarks panel-primary">
    <div class="panel-heading">
      <span>Bookmarks</span>
      <span v-for="parent in parents">
        <a @click.prevent="open(parent)">{{ parent.title }}</a>
      </span>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
        <tr>
          <th>#</th>
          <th>Date added</th>
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

  import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

  @Component({name: 'bookmarks'})
  export default class Bookmarks extends Vue {
    bookmarks: Array<BookmarkTreeNode> = []
    parents: Array<BookmarkTreeNode> = [{title: 'Root', id: '1'}]

    async created() {
      this.getBookmarks(1)
    }

    mounted() {
      console.log('Bookmarks component mounted.')
    }

    date(timestamp: number) {
      return new Date(timestamp).toISOString().slice(0, 10)
    }

    open(bookmark: BookmarkTreeNode) {
      console.log({bookmark})
      if (bookmark.url) return

      this.parents.push(bookmark)
    }

    async getBookmarks(parentId = 1) {
      this.bookmarks = await bookmarks.getChild(parentId)
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
</style>
