/**
 * Initialize new SettingsForm instance
 * 
 * @param {String} formId
 * @param {Status} status
 * @param {Storage} storage
 * @param {String} defaultApiUrl
 */
function SettingsForm(formId, status, storage, defaultApiUrl) {
    var self = this;
    this.formElement = new crip(formId);
    this.apiUrl = new crip('api-url');
    this.apiKey = new crip('api-key');
    this.status = status;
    this.storage = storage;

    this.formElement.on('submit', this.saveUserSettings, self);
    this.storage.get('api_url', this.setUrlValue.bind(this), defaultApiUrl);
    this.storage.get('api_key', this.setKeyValue.bind(this), '---');
}

SettingsForm.prototype.setUrlValue = function (value) {
    this.apiUrl.val(value);
}

SettingsForm.prototype.setKeyValue = function (value) {
    this.apiKey.val(value);
}

SettingsForm.prototype.saveUserSettings = function (e) {
    e.preventDefault();
    this.status.hide();
    var url = this.apiUrl.val();
    var key = this.apiKey.val();

    if (!url) {
        this.status.error('No value specified in url field!');
        return;
    }

    if (!key) {
        this.status.error('No value specified in key field!');
        return;
    }

    var saved = true;
    this.storage.set('api_url', url, onValueSaved.bind(this));
    this.storage.set('api_key', key, onValueSaved.bind(this));

    function onValueSaved(result, key) {
        if (result && saved) {
            this.status.success('Key and url successfuly saved!');
            return;
        }
        saved = false;
        this.status.error('Could note store "' + key + '"')
    }
}