function Bookmarks(chromeBookmarks) {
    this.bookmarks = chromeBookmarks;

    this.registerEvents();
}

Bookmarks.prototype.registerEvents = function () {
    this.bookmarks.onCreated.addListener(this.onCreated);
    this.bookmarks.onChanged.addListener(this.onChanged);
    this.bookmarks.onRemoved.addListener(this.onRemoved);
    this.bookmarks.onMoved.addListener(this.onMoved);
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
    // bookmark: { index:int, node: { dateAdded:int, id:string, title:string, url:string}, parentId:string }
    // folder: { index:int, node: { dateAdded:int, id:string, title:string, children:Array}, parentId:string }
}

Bookmarks.prototype.onRemoved = function (id, bookmark) {
    console.log('bookmark moved', { id: id, bookmark: bookmark });
    // bookmark: { index:int, oldIndex:int, parentId:string, oldParentId:string }
}

Bookmarks.prototype.sendDataToApi = function (apiKey, iteractionName, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', resolveEndpointUrl(iteractionName), true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}