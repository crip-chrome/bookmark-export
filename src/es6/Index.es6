import {BookmarkExport} from "./BookmarkExport.es6";
import {Bookmarks} from "./Bookmarks.es6";

var defaultApiUrl = 'http://Crip.lv/api/chrome-bookmarks';

new Bookmarks(chrome.bookmarks);

window.addEventListener('load', () => new BookmarkExport(defaultApiUrl));