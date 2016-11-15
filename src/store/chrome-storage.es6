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
    },

    add(table, row) {

        var addEntry = (data) => {
            // TODO: audit size should be configurable
            var max_audit_size = 50;

            // get list or initialize new one
            var list = JSON.parse(data[table] || "[]");

            // remove last element if size limit exceeded
            if (list.length >= max_audit_size) {
                list.splice(-1, 1);
            }

            // add row to the beginning of the list
            list.unshift(row);

            return {[table]: JSON.stringify(list)};
        };

        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(table, data => {
                if (chrome.runtime.error) {
                    reject(chrome.runtime.error);
                    return;
                }

                var obj = addEntry(data);

                chrome.storage.sync.set(obj, () => {
                    if (chrome.runtime.error) {
                        reject(chrome.runtime.error);
                        return;
                    }

                    resolve(table, row);
                });
            });
        });
    },

    read(table) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(table, data => {
                if (chrome.runtime.error) {
                    reject(chrome.runtime.error);
                    return;
                }

                resolve(JSON.parse(data[table]));
            });
        });
    },

    clear(key) {
        chrome.storage.sync.set({[key]: ''}, x => x);
    }
}