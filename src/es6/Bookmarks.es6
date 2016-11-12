import {Storage} from './Storage.es6';

export class Bookmarks {
    /**
     * Initialize new instance of Bookmarks class
     *
     * @param {object} chromeBookmarks
     */
    constructor(chromeBookmarks) {
        this.bookmarks = chromeBookmarks;
        this.storage = new Storage();

        this.registerEvents();
    }

    /**
     * Register all chrome bookmark events
     */
    registerEvents() {
        this.bookmarks.onCreated.addListener(this.onCreated.bind(this));
        this.bookmarks.onChanged.addListener(this.onChanged.bind(this));
        this.bookmarks.onRemoved.addListener(this.onRemoved.bind(this));
        this.bookmarks.onMoved.addListener(this.onMoved.bind(this));
    }

    /**
     * React on chrome bookmark/page created event
     *
     * @param {string}  id
     * @param {object}  bookmark
     * @param {int}     bookmark.dateAdded
     * @param {int}     bookmark.index
     * @param {string}  bookmark.id
     * @param {string}  bookmark.parentId
     * @param {string}  bookmark.title
     * @param {string?} bookmark.url               Available only for page
     * @param {int?}    bookmark.dateGroupModified Available only for folder
     */
    onCreated(id, bookmark) {
        this._sendDataToApi('created', bookmark);
    }

    /**
     * React on chrome bookmark/page changed event
     *
     * @param {string}  id
     * @param {object}  bookmark
     * @param {string}  bookmark.title
     * @param {string?} bookmark.url Available only for page
     */
    onChanged(id, bookmark) {
        this._sendDataToApi('changed', bookmark);
    }

    /**
     * React on chrome bookmark/page moved event
     *
     * @param {string} id
     * @param {object} bookmark
     * @param {int}    bookmark.index
     * @param {int}    bookmark.oldIndex
     * @param {string} bookmark.parentId
     * @param {string} bookmark.oldParentId
     */
    onMoved(id, bookmark) {
        this._sendDataToApi('moved', bookmark);
    }

    /**
     * React on chrome bookmark/page removed event
     *
     * @param {string}  id
     * @param {object}  bookmark
     * @param {int}     bookmark.index
     * @param {string}  bookmark.parentId
     * @param {object}  bookmark.node
     * @param {int}     bookmark.node.dateAdded
     * @param {string}  bookmark.node.id
     * @param {string}  bookmark.node.title
     * @param {string?} bookmark.node.url               Available only for page
     * @param {int?}    bookmark.node.dateGroupModified Available only for folder
     */
    onRemoved(id, bookmark) {
        bookmark.id = bookmark.node.id;
        this._sendDataToApi('removed', bookmark);
    }

    _sendDataToApi(interactionName, data) {
        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert(xhr.responseText);
            }
        };

        var onUrlReceived = obj => {
            xhr.setRequestHeader('Authorization', `Bearer ${obj.api_key}`);
            xhr.open('POST', `${obj.api_url}/${interactionName}`, true);
            xhr.send(JSON.stringify(data));
        };

        this.storage.get(['api_url', 'api_key'], onUrlReceived.bind(this));
    }
}