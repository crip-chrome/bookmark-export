
var defaultApiUrl = 'http://crip.lv/api/chrome-bookmarks';

// initializes bookmark listeners
var bookmarks = new Bookmarks(chrome.bookmarks, defaultApiUrl);

// when document ready
window.addEventListener('load', function (evt) {
  new BookmarkExport();
});

function crip(id) {
  /** @type HTMLElement */
  this.element = document.getElementById(id);
  /**
   * Set/read inner text
   * 
   * @param {?String} value
   * @returns {crip|String}
   */
  this.text = function (value) {
    if (!value) {
      return this.element.innerText;
    }

    this.element.innerText = value;
    return this;
  }

  /**
   * Set/Get element (inmput) value
   * 
   * @param {?String} value
   * @returns {String|crip}
   */
  this.val = function (value) {
    if (!value) {
      return this.element.value;
    }

    this.element.value = value;
    return this;
  }
  /**
   * Add event listener on element
   * 
   * @param {String} eventName
   * @param {function} cb
   * @param {?any} scope
   * @returns
   */
  this.on = function (eventName, cb, scope) {
    this.element.addEventListener(eventName, cb.bind(scope || this));
    return this;
  };

  /**
   * Show element on the screen
   */
  this.show = function() {
    this.element.style.display = 'block';
    return this;
  }

  /**
   * Hide element on the screen
   */
  this.hide = function() {
    this.element.style.display = 'none';
    return this;
  }

}

function BookmarkExport() {
  this.status = new Status('status');
  this.storage = new Storage(this.status);
  this.SettingsForm = new SettingsForm('app-settings', this.status, this.storage, defaultApiUrl);

  this.settingsForm = new crip('app-settings');
  this.appForm = new crip('app');
  this.viewBtn = new crip('change-view');

  this.initControls();
}

BookmarkExport.prototype.initControls = function () {
  this.viewBtn.on('click', this.onViewBtnClick, this);
}

BookmarkExport.prototype.onViewBtnClick = function (evt) {
  if (this.viewBtn.text() === 'Back') {
    this.viewBtn.text('Settings');
    this.appForm.show();
    this.settingsForm.hide();
    return;
  }

  this.viewBtn.text('Back');
  this.appForm.hide();
  this.settingsForm.show();
}