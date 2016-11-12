export class Status {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    success(message) {
        this._showStatus('success', message);
    }

    error(message) {
        this._showStatus('error', message);
    }

    hide() {
        this.element.style.display = 'none';
    }

    _showStatus(className, message) {
        this.element.style.display = 'block';
        this.element.innerHTML = message;
        this.element.className = className;
    }
}