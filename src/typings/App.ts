import {Status} from './Status';

export class App {

    defaultApiUrl: string;
    statusElementId: string;

    constructor() {
        this.defaultApiUrl = 'http://crip.lv/api/chrome-bookmarks';
        this.statusElementId = 'status';
    }

    run() {
         let status = new Status(this.statusElementId);
    }
}