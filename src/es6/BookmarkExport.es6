import {Crip} from './Crip.es6';
import {Storage} from './Storage.es6';
import {Status} from './Status.es6';
import {SettingsForm} from './SettingsForm.es6';
import {ManagementForm} from './ManagementForm.es6';

export class BookmarkExport {
    /**
     * Initialize new instance of BookmarkExport class
     *
     * @param {string} defaultApiUrl
     */
    constructor(defaultApiUrl) {
        var status = new Status('status');
        var storage = new Storage(status);

        this.settingsForm = new SettingsForm('app-settings', status, storage, defaultApiUrl);
        this.managementForm = new ManagementForm();

        this.settingsForm = new Crip('app-settings');
        this.appForm = new Crip('app');
        this.viewBtn = new Crip('change-view');
        this.initControls();
    }

    /**
     * Init BookmarkExport class controls listenners
     */
    initControls() {
        this.viewBtn.on('click', this.onViewBtnClick, this);
    }

    /**
     * React on view btn click
     */
    onViewBtnClick() {
        if (this.viewBtn.text() === 'Back') {
            this.viewBtn.text('Settings');
            this.appForm.show();
            this.settingsForm.hide();
            return;
        }

        this.viewBtn.text('Back');
        this.appForm.hide();
        this.settingsForm.show();
    }
}