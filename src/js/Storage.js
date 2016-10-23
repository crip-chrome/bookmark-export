
function Storage(status, defaultApiUrl) {
    this.status = status;
    this.defaultApiUrl = defaultApiUrl;
}

Storage.prototype.saveApiUrl = function (value) {
    var self = this;
    chrome.storage.sync.set({ 'crip_api_url': value }, function () {
        if (chrome.runtime.error) {
            self.status.error('Storage runtime error.');
            return;
        }

        self.status.success('API url successfully updated.');
    })
}

Storage.prototype.getApiUrl = function (cb) {
    var result = this.defaultApiUrl;
    chrome.storage.sync.get('crip_api_url', function (data) {
        if (chrome.runtime.error) {
            cb(result);
        }

        cb(data.crip_api_url);
    });

    cb(result);
}
