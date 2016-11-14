import storage from './store/chrome-storage.es6';

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

function _sendDataToApi(interactionName, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        } else {
            console.error('Error sending bookmark to blog. Server response is not successful', xhr);
            // TODO: add error visible in management page
        }
    };

    storage.get(['api_url', 'api_key'])
        .then(obj => {
            xhr.open('POST', `${obj.api_url}/${interactionName}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${obj.api_key}`);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.send(JSON.stringify(data));
        })
        .catch((ex) => {
            console.error('Error sending bookmark to blog. Could not load api settings.', ex);
            // TODO: add error visible in management page
        });
}

/**
 * React on chrome bookmark created event
 *
 * @param {string}  id
 * @param {BookmarkTreeNode} bookmark
 */
function onCreated(id, bookmark) {
    _sendDataToApi('created', bookmark);
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
    _sendDataToApi('moved-away', removeInfo.node);
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
    _sendDataToApi('edited', changeInfo);
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
    _sendDataToApi('changed-position', moveInfo);
}