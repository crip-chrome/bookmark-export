<template>
  <ol class="breadcrumb">
    <router-link :to="rootRoute" tag="li">
      <a>Root</a>
    </router-link>

    <router-link
        :to="pageRoute(page.id)" v-for="page in pages" :key="page.id" tag="li"
    >
      <a>{{ page.title }}</a>
    </router-link>
  </ol>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'

  import * as routes from '../router/routes'
  import router from '../router'
  import {bookmarks} from '../services'

  import BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode

  @Component({name: 'breadcrumb'})
  export default class Breadcrumb extends Vue {
    pages: Array<BookmarkTreeNode> = []

    get rootRoute() {
      return routes.bookmarks('1')
    }

    pageRoute(id: string) {
      return routes.bookmarks(id)
    }

    @Watch('$route.params.page')
    async onPageChange(page: string): Promise<void> {
      this.pages = await bookmarks.getTree(page)
    }
  }
</script>

<style>
  .router-link-active {
    font-weight: bold;
  }

  .breadcrumb {
    margin-bottom: 0;
  }
</style>