class Scene {
    constructor({ objects = [] } = {}) {
        this.objects = objects;
        this.objects.forEach(gameObject => gameObject.destroy = () => this.delete(gameObject));
    }

    addState(state) {
        state.scene = {
            spawn: gameObject => {
                this.spawn(gameObject);
            }
        };
        this.state = state;
    }

    delete(gameObject) {
        gameObject.onDestroy && gameObject.onDestroy();
        delete this.objects.splice(this.objects.indexOf(gameObject), 1);
    }
    
    spawn(gameObject) {
        gameObject.destroy = () => this.delete(gameObject);
        gameObject.start && gameObject.start(this.state);
        this.objects.push(gameObject);
    }

    start(state) {
        this.addState(state);
        this.objects.forEach(gameObject => gameObject.start && gameObject.start(state));
    }

    update(state) {
        this.objects.forEach(gameObject => gameObject.update && gameObject.update(state));
    }

    lateUpdate(state) {
        this.objects.forEach(gameObject => gameObject.lateUpdate && gameObject.lateUpdate(state));
    }
}