<template>
  <div class="panel bookmarks panel-primary">
    <div class="panel-heading">
      <img src="logo.png" alt="CRIP Logo" class="crip-logo"/>
      <span>Bookmarks</span>
      <router-link :to="configRoute" class="pull-right" title="Settings">
        <i class="fa fa-cogs white"></i>
      </router-link>
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
        <tr v-for="bookmark in bookmarks" :key="bookmark.id">
          <td>{{ bookmark.id }}</td>
          <td>
            <i class="fa" :class="getClass(bookmark)"></i>
            {{ date(bookmark.dateAdded) }}
          </td>
          <td class="table-wide">
            <span v-if="bookmark.isRegistered">
              {{ bookmark.title }}
            </span>
            <a
                @click.prevent="open(bookmark)" href class="open"
                :title="title(bookmark)" v-else
            >
              {{ bookmark.title }}
            </a>
          </td>
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
  import Bookmark from '../models/Bookmark'
  import Breadcrumb from './Breadcrumb.vue'
  import router from '../router'
  import {bookmarks} from '../services'

  @Component({
    name: 'bookmarks',
    components: {Breadcrumb}
  })
  export default class Bookmarks extends Vue {

    /**
     * Collection of bookmark nodes in current page.
     * @type {Array}
     */
    bookmarks: Array<Bookmark> = []

    /**
     * Configuration component route.
     * @type {Location}
     */
    configRoute = routes.config()

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
     * @return {void}
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
     * @param  {Bookmark} bookmark
     * @return {Promise<void>}
     */
    open(bookmark: Bookmark) {
      if (bookmark.url) {
        if (bookmark.isRegistered) {
          return
        }

        bookmark.isRegistered = true
        return bookmarks.save(bookmark)
      }

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
     * Get class for bookmark row.
     * @param  {Bookmark} bookmark
     * @return {Array<string>}
     */
    getClass(bookmark: Bookmark): string[] {
      if (bookmark.isFolder) return ['fa-folder', 'gray']

      if (bookmark.isRegistered) {
        return ['fa-circle', 'success']
      }

      return ['fa-circle', 'danger']
    }

    /**
     * Get title for a bookmark 'a' tag.
     * @param  {Bookmark} bookmark
     * @return {String}
     */
    title(bookmark: Bookmark): string {
      return bookmark.isFolder ?
          'Open' :
          'Send to server'
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

<style lang="scss">
  @import "./../scss/variables";

  .bookmarks {
    margin: -1px;
  }

  td.table-wide {
    max-width: 160px;
  }

  .table-wide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .breadcrumb-item {
    color: white;
  }

  .fa {
    &.danger {
      color: #d9534f;
    }

    &.success {
      color: #5cb85c;
    }

    &.gray {
      color: $second-color;
    }

    &.white {
      color: $footer-text-color;
    }
  }

  .open {
    @extend .table-wide;
    display: block;
    height: 100%;
    width: 100%;
  }

  .crip-logo {
    margin: -10px 0 -10px -10px;
    padding-right: 5px;
    width: 36px;
  }

  .panel-heading .pull-right {
    margin-top: -7px;
    padding: 7px;

    &:hover .fa {
      color: $link-color-inverse;
    }
  }
</style>
