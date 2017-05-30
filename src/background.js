import * as blog from './api/blog'

/**
 * Register all interested chrome bookmark events
 */
chrome.bookmarks.onCreated.addListener((id, bookmark) => blog.create(bookmark))
chrome.bookmarks.onChanged.addListener((id, bookmark) => blog.change(bookmark))
chrome.bookmarks.onRemoved.addListener((id, bookmark) => blog.remove(bookmark))
chrome.bookmarks.onMoved.addListener((id, bookmark) => blog.move(id, bookmark))

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
