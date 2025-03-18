class MouseInput {
    constructor(elementId) {
        this.element = document.getElementById(elementId) || document.body;
        this.events = {
            wheel: [],
            mousemove: [],
            mouseleave: [],
            mouseup: [],
            mousedown: []
        }
    }

    addListener(name, callback) {
        this.events[name]?.push(callback);
    }

    invoke(name, event) {
        this.events[name].forEach(callback => callback(event));
    }

    enable() {
        Object.keys(this.events).forEach(key => {
            this[key] = event => this.invoke(key, event);
            this.element.addEventListener(key, this[key]);
        });
    }

    disable() {
        Object.keys(this.events).forEach(key => {
            this.element.removeEventListener(key, this[key]);
            this[key] = null;
        });
    }
}