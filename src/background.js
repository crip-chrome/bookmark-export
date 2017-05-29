import storage from './store/chrome-storage'
import settings from './settings'
import Api from './store/modules/api'

/**
 * Register all interested chrome bookmark events
 */
chrome.bookmarks.onCreated.addListener(Api.onCreated)
chrome.bookmarks.onChanged.addListener(Api.onChanged)
chrome.bookmarks.onRemoved.addListener(Api.onRemoved)
chrome.bookmarks.onMoved.addListener(Api.onMoved)

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
 */

window.clearAudit = () => {
  storage.clear(settings.audit_table)
}

window.logAudit = () => {
  storage.read(settings.audit_table)
        .then((data) => console.log(data))
}
