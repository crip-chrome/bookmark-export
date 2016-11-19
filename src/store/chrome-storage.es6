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

    /**
     * Add new element to chrome storage table
     *
     * @param {string} table
     * @param {object} row
     * @returns {Promise}
     */
    add(table, row) {
        return this._save(table, row, this._addEntry);
    },

    /**
     * Read all data from table
     *
     * @param {string} table
     * @returns {Promise}
     */
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

    /**
     * Update row in the chrome table
     *
     * @param {string} table
     * @param {object} row
     * @returns {Promise}
     */
    update(table, row) {
        return this._save(table, row, this._updateEntry);
    },

    /**
     * Clear key/table in storage
     *
     * @param {string} key
     */
    clear(key) {
        chrome.storage.sync.set({[key]: ''}, x => x);
    },

    /**
     * Add entry to data object
     *
     * @param {Array} data
     * @param {string} table
     * @param {AuditEntry} row
     * @returns {object}
     * @private
     */
    _addEntry(data, table, row) {
        // TODO: audit size should be configurable
        var max_audit_size = 50;

        // get list or initialize new one
        var list = JSON.parse(data[table] || "[]");

        // remove last element if size limit exceeded
        if (list.length >= max_audit_size) {
            list.splice(-1, 1);
        }

        row._id = new Date().getTime();

        // add row to the beginning of the list
        list.unshift(row);

        return {[table]: JSON.stringify(list)};

    },

    /**
     * Update entry in data object
     *
     * @param {array} data
     * @param {string} table
     * @param {object} row
     * @private
     */
    _updateEntry(data, table, row) {
        var list = JSON.parse(data[table]);

        // find index of matching row
        var index = list.map((x) => x._id).indexOf(row._id);

        if(!~index) throw new Error(`Could not find ${row._id} in existing data list!`);
        // update pointer to updated object
        list[index] = row;

        return {[table]: JSON.stringify(list)};
    },

    /**
     * Save data in chrome storage using callback method
     *
     * @param {string} table
     * @param {object} row
     * @param {function} action
     * @returns {Promise}
     * @private
     */
    _save(table, row, action) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(table, data => {
                if (chrome.runtime.error) {
                    reject(chrome.runtime.error);
                    return;
                }

                var obj = action(data, table, row);

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
}