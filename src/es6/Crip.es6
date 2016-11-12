export class Crip {
    constructor(id) {
        this.element = document.getElementById(id);
    }

    /**
     * Set/read inner text
     *
     * @param {string} value
     * @returns {Crip|string}
     */
    text(value) {
        if (!value) {
            return this.element.innerText;
        }

        this.element.innerText = value;

        return this;
    }

    /**
     * Set/Get element (input) value
     *
     * @param {string} value
     * @returns {Crip|string}
     */
    val(value) {
        if (!value) {
            return this.element.value;
        }

        this.element.value = value;

        return this;
    }

    /**
     *
     * @param {string} eventName
     * @param {function} cb
     * @param {object?} scope
     * @returns {Crip}
     */
    on(eventName, cb, scope) {
        this.element.addEventListener(eventName, cb.bind(scope || this));

        return this;
    }

    /**
     * Show element on the screen
     *
     * @returns {Crip}
     */
    show() {
        this.element.style.display = 'block';

        return this;
    };

    /**
     * Hide element on the screen
     *
     * @returns {Crip}
     */
    hide() {
        this.element.style.display = 'none';

        return this;
    };

}
