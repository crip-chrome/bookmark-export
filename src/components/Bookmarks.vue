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
  import {Component, Watch} from 'vue-property-decorator'

  import * as routes from '../router/routes'
  import Breadcrumb from './Breadcrumb.vue'
  import router from '../router'
  import {bookmarks} from '../services'

  import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode

  @Component({
    name: 'bookmarks',
    components: {Breadcrumb}
  })
  export default class Bookmarks extends Vue {

    /**
     * Collection of bookmark nodes in current page.
     */
    bookmarks: Array<BookmarkTreeNode> = []

    /**
     * Hook in to vue lifecycle and start load bookmarks while component is
     * mounting.
     * @return {Promise<void>}
     */
    async created(): Promise<void> {
      return await this.getBookmarks()
    }

    /**
     * Hook in to vue lifecycle and log initialization completed state.
     */
    mounted() {
      console.log('Bookmarks component mounted.')
    }

    /**
     * Convert timestamp to readable date string.
     * @param  {Number} timestamp
     * @return {String}
     */
    date(timestamp: number) {
      return new Date(timestamp).toISOString().slice(0, 10)
    }

    /**
     * Open bookmark.
     * @param {BookmarkTreeNode} bookmark
     */
    open(bookmark: BookmarkTreeNode) {
      if (bookmark.url) return
      router.push(routes.bookmarks(bookmark.id))
    }

    /**
     * Fetch bookmarks from browser storage.
     * @param  {String} parentId
     * @return {Promise<void>}
     */
    async getBookmarks(parentId = '1'): Promise<void> {
      this.bookmarks = await bookmarks.getChildren(parentId)
    }

    /**
     * Watch route page change and mutate data.
     * @param  {String} page
     * @return {Promise<void>}
     */
    @Watch('$route.params.page')
    async onPageChange(page: string): Promise<void> {
      await this.getBookmarks(page)
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
