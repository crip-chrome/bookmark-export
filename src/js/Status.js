/**
 * Initialize new Status instance 
 * 
 * @param {String} elementId DOM element id
 */
function Status(elementId) {
    this.element = document.getElementById(elementId);
}

/**
 * Show success message in status element
 * 
 * @param {String} message Message to show
 */
Status.prototype.success = function (message) {
    this._showStatus('success', message);
}

/**
 * Show error message in status element
 * 
 * @param {String} message Message to show
 */
Status.prototype.error = function (message) {
    this._showStatus('error', message);
}

/**
 * Hide status element on screen
 */
Status.prototype.hide = function() {
    this.element.style.display = 'none';
}

Status.prototype._showStatus = function(className, message) {
    this.element.style.display = 'block';
    this.element.innerHTML = message;
    this.element.className = className;
}