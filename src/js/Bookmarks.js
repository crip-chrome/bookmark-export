function Bookmarks(chromeBookmarks, defaultApiUrl) {
    this.bookmarks = chromeBookmarks;
    this.defaultApiUrl = defaultApiUrl;
    this.storage = new Storage();

    this.registerEvents();
}

Bookmarks.prototype.registerEvents = function () {
    this.bookmarks.onCreated.addListener(this.onCreated.bind(this));
    this.bookmarks.onChanged.addListener(this.onChanged.bind(this));
    this.bookmarks.onRemoved.addListener(this.onRemoved.bind(this));
    this.bookmarks.onMoved.addListener(this.onMoved.bind(this));
}

Bookmarks.prototype.onCreated = function (id, bookmark) {
    console.log('bookmark created', { id: id, bookmark: bookmark });
    // folder {dateAdded: int, parentId: string, title: string}
    // if page + {url: string}
}

Bookmarks.prototype.onChanged = function (id, bookmark) {
    console.log('bookmark Changed', { id: id, bookmark: bookmark });
    // folder - bookmark: { title: string }
    // link - bookmark: { title: string, url: string } - called twice and each time other field is changed
}

Bookmarks.prototype.onRemoved = function (id, bookmark) {
    console.log('bookmark removed', { id: id, bookmark: bookmark });
    this.sendDataToApi('test-key', 'removed', bookmark);
    // bookmark: { index:int, node: { dateAdded:int, id:string, title:string, url:string}, parentId:string }
    // folder: { index:int, node: { dateAdded:int, id:string, title:string, children:Array}, parentId:string }
}

Bookmarks.prototype.onMoved = function (id, bookmark) {
    console.log('bookmark moved', { id: id, bookmark: bookmark });
    // bookmark: { index:int, oldIndex:int, parentId:string, oldParentId:string }
    this.sendDataToApi('test-key', 'moved', bookmark);
}


Bookmarks.prototype.sendDataToApi = function (apiKey, iteractionName, data) {
    this.storage.getApiUrl((function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url + '?action=' + iteractionName, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('X-Auth-Key', apiKey);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(data));
    }).bind(this));
}