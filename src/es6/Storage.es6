export class Storage {
    /**
     * Initialize new Storage instance
     *
     * @param {Status} status
     */
    constructor(status) {
        this.status = status;
    }

    /**
     * Save variable to chrome storage
     *
     * @param {string} key
     * @param {string} value
     * @param {function} onComplete
     */
    set(key, value, onComplete) {
        var obj = {
            [key]: value
        };

        chrome.storage.sync.set(obj, () => {
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
     * @param {string} key
     * @param {function} cb Callback where value will be accessible
     * @param {string?} defaultValue
     */
    get(key, cb, defaultValue) {
        chrome.storage.sync.get(key, data => {
            if (chrome.runtime.error)
                cb(defaultValue || '');

            if (Array.isArray(key))
                cb(data);
            else
                cb(data[key]);
        });
    }
}