class KeyboardInput {
    constructor(elementId) {
        this.element = document.getElementById(elementId) || document.body;
        this.bindings = [];
    }

    bind(...bindings) {
        bindings.forEach(({ key, method }) => this.bindings.push({ key, method, state: false }));
    }

    getBind(code) {
        return this.bindings.find(({ key }) => code === key);
    }

    enable() {
        this.keyDownHandler = event => {
            const bind = this.getBind(event.code);
            if (bind && !bind.state) {
                bind.state = true;
                bind.method(true);
            }
        };
        this.keyUpHandler = event => {
            const bind = this.getBind(event.code);
            if (bind && bind.state) {
                bind.state = false;
                bind.method(false);
            }
        };

        this.element.addEventListener('keydown', this.keyDownHandler);
        this.element.addEventListener('keyup', this.keyUpHandler);
    }

    disable() {
        this.element.removeEventListener('keydown', this.keyDownHandler);
        this.element.removeEventListener('keyup', this.keyUpHandler);
        this.keyDownHandler = null;
        this.keyUpHandler = null;
    }
}