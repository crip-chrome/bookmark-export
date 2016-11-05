/**
 * Initialize new Storage instance 
 * 
 * @param {Status} status
 */
function Storage(status) {
    this.status = status;
}

/**
 * Save variable to chrome storage
 * 
 * @param {String} key
 * @param {String} value
 * @param {function} onComplete
 */
Storage.prototype.set = function (key, value, onComplete) {
    var self = this;
    var obj = {}; obj[key] = value;
    chrome.storage.sync.set(obj, function () {
        if (chrome.runtime.error) {
            onComplete(false, key);
            return;
        }

        onComplete(true, key);
    })
}

/**
 * Asynchronously get variable from chrome storage
 * 
 * @param {String} key
 * @param {function} cb Callback where value will be accessible
 * @param {?String} defaultValue
 */
Storage.prototype.get = function (key, cb, defaultValue) {
    chrome.storage.sync.get(key, function (data) {
        if (chrome.runtime.error) 
            cb(defaultValue || '');

        cb(data[key]);
    });
}
