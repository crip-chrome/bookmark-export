import storage from './store/chrome-storage.es6';
import {AuditType, AuditEntry, InteractionType} from './store/audit.es6';
import settings from './settings.es6';

/**
 * Register all interested chrome bookmark events
 */
chrome.bookmarks.onCreated.addListener(onCreated);
chrome.bookmarks.onChanged.addListener(onChanged);
chrome.bookmarks.onRemoved.addListener(onRemoved);
chrome.bookmarks.onMoved.addListener(onMoved);

/**
 * @typedef {Object}   BookmarkTreeNode
 * @property {string}  id                The unique identifier for the node.
 * @property {?string} parentId          The id of the parent folder. Omitted for the root node.
 * @property {?int}    index             The 0-based position of this node within its parent folder.
 * @property {?string} url               The URL navigated to when a user clicks the bookmark. Omitted for folders.
 * @property {string}  title             The text displayed for the node.
 * @property {?int}    dateAdded         The text displayed for the node.
 * @property {?int}    dateGroupModified When the contents of this folder last changed, in milliseconds since the epoch.
 *
 * @property {?BookmarkTreeNode[]} children  An ordered list of children of this node.
 *
 */

window.clearAudit = () => {
    storage.clear(settings.audit_table);
};

window.logAudit = () => {
    storage.read(settings.audit_table)
        .then((data) => console.log(data));
};

/**
 *
 * @param {string} interactionName
 * @param {*} data
 * @private
 */
function _sendDataToApi(interactionName, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        let entry = new AuditEntry(interactionName, data.title, data.id);
        if (xhr.readyState === 4 && xhr.status === 200) {
            storage.add(settings.audit_table, entry);
        }

        if (xhr.readyState === 4 && xhr.status !== 200) {
            entry.type = AuditType.error;
            storage.add(settings.audit_table, entry);
        }
    };

    storage.get([settings.url, settings.key])
        .then(obj => {
            xhr.open('POST', `${obj[settings.url]}/${interactionName}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${obj[settings.key]}`);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.send(JSON.stringify(data));
        })
        .catch((ex) => {
            var entry = new AuditEntry(InteractionType.read_configurations, ex, data.id, AuditType.error);
            storage.add(settings.audit_table, entry);
        });
}

/**
 * React on chrome bookmark created event
 *
 * @param {string}  id
 * @param {BookmarkTreeNode} bookmark
 */
function onCreated(id, bookmark) {
    _sendDataToApi(InteractionType.created, bookmark);
}
/**
 *
 * React on chrome bookmark removed event
 *
 * @param {string}           id
 * @param {object}           removeInfo
 * @param {string}           removeInfo.parentId
 * @param {int}              removeInfo.index
 * @param {BookmarkTreeNode} removeInfo.node
 */
function onRemoved(id, removeInfo) {
    _sendDataToApi(InteractionType.removed, removeInfo.node);
}

/**
 * React on chrome bookmark changed event
 *
 * @param {string}  id
 * @param {object}  changeInfo
 * @param {string}  changeInfo.title
 * @param {string?} changeInfo.url   Available only for page
 */
function onChanged(id, changeInfo) {
    changeInfo.id = id;
    _sendDataToApi(InteractionType.changed, changeInfo);
}

/**
 * React on chrome bookmark moved event
 *
 * @param {string} id
 * @param {object} moveInfo
 * @param {string} moveInfo.parentId
 * @param {int}    moveInfo.index
 * @param {string} moveInfo.oldParentId
 * @param {int}    moveInfo.oldIndex
 */
function onMoved(id, moveInfo) {
    moveInfo.id = id;
    _sendDataToApi(InteractionType.moved, moveInfo);
}