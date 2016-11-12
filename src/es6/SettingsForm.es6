import {Crip} from "./Crip.es6";

export class SettingsForm {
    /**
     *
     * @param {string} formId
     * @param {Status} status
     * @param {Storage} storage
     * @param {string} defaultApiUrl
     */
    constructor(formId, status, storage, defaultApiUrl) {
        this.formElement = new Crip(formId);
        this.apiUrl = new Crip('api-url');
        this.apiKey = new Crip('api-key');
        this.status = status;
        this.storage = storage;

        this.formElement.on('submit', this.saveUserSettings, this);
        this.storage.get('api_url', this.setUrlValue.bind(this), defaultApiUrl);
        this.storage.get('api_key', this.setKeyValue.bind(this), '---');
    }

    setUrlValue(value) {
        this.apiUrl.val(value);
    }

    setKeyValue(value) {
        this.apiKey.val(value);
    }

    saveUserSettings(e) {
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
                this.status.success('Key and url successfully saved!');
                return;
            }
            saved = false;
            this.status.error(`Could note store "${key}"`)
        }
    }
}