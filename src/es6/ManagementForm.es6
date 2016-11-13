import {Crip} from './Crip.es6';

export class ManagementForm {
    constructor() {
        this.synchronizeUrl = new Crip('synchronize');

        this.registerEvents();
    }

    registerEvents() {
        this.synchronizeUrl.on('click', this.onSynchronizeUrlClick, this);
    }

    onSynchronizeUrlClick() {

    }
}