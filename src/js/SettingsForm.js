/**
 * Initialize new SettingsForm instance
 * 
 * @param {String} formId
 * @param {Status} status
 */
function SettingsForm(formId, status, storage, inputId) {
    var self = this;
    this.formElement = document.getElementById(formId);
    this.inputElement = document.getElementById(inputId);
    this.status = status;
    this.storage = storage;

    this.formElement.addEventListener('submit', this.saveUserSettings);
    this.storage.getApiUrl(function (value) {
        self.inputElement.value = value;
    });
}

SettingsForm.prototype.saveUserSettings = function (e) {
    e.preventDefault();
    this.status.hide();

    var url = this.inputElement.value;

    if (!url) {
        this.status.error('No value specified!');
        return;
    }

    this.storage.saveApiUrl(value);
}