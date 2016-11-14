export default {
    /**
     * Asynchronously save variable to chrome storage
     *
     * @param {String|Object} key Property key|Complex object to set
     * @param {Object?} value Property value
     * @returns {Promise}
     */
    set(key, value) {
        var obj;

        if (key instanceof Object)
            obj = key;
        else
            obj = {[key]: value};

        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(obj, () => {
                if (chrome.runtime.error) {
                    reject(chrome.runtime.error);
                    return;
                }

                resolve(key);
            });
        });
    },

    /**
     * Asynchronously get variable from chrome storage
     *
     * @param {String|Array} key Property key
     * @returns {Promise}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, data => {
                if (chrome.runtime.error) {
                    reject(chrome.runtime.error);
                    return;
                }

                // resolve entire object if requested array of parameters or a single value
                resolve(Array.isArray(key) ? data : data[key]);
            })
        });
    }
}