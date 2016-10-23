export class Status {

    element: HTMLElement;

    constructor(private elementId: string) {
        this.element = document.getElementById(elementId);
    }

    public success(message: string) {
        this.showStatus('success', message);
    }

    public error(message: string) {
        this.showStatus('error', message);
    }

    public hide() {
        this.element.style.display = 'none';
    }

    private showStatus(className: string, message: string) {
        this.element.style.display = 'block';
        this.element.innerHTML = message;
        this.element.className = className;
    }
}