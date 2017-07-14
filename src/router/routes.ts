import {Location} from 'vue-router/types/router'

export function loading(): Location {
  return {name: 'loading'}
}

export function login(): Location {
  return {name: 'login'}
}

export function bookmarks(page: string): Location {
  return {name: 'bookmarks', params: {page}}
}

export function config(): Location {
  return {name: 'config'}
}
