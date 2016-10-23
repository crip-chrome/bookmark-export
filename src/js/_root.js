
var defaultApiUrl = 'http://crip.lv/api/chrome-bookmarks';

// initializes bookmark listeners
var bookmarks = new Bookmarks(chrome.bookmarks);

// when document ready
window.addEventListener('load', function (evt) {
  var status = new Status('status');
  var storage = new Storage(status, defaultApiUrl);
  var form = new SettingsForm('app-settings', status, storage, 'api-url');
});