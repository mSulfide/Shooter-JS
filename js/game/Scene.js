class Scene {
    constructor({ objects = [] } = {}) {
        this.objects = objects;
        this.objects.forEach(gameObject => gameObject.destroy = () => this.delete(gameObject));
    }

    delete(gameObject) {
        delete this.objects.splice(this.objects.indexOf(gameObject), 1);
    }
    
    spawn(gameObject) {
        gameObject.destroy = () => this.delete(gameObject);
        this.objects.push(gameObject);
    }

    start(state) {
        state.scene = {
            spawn: gameObject => {
                this.spawn(gameObject);
                gameObject.start && gameObject.start(state);
            }
        };
        this.objects.forEach(gameObject => gameObject.start && gameObject.start(state));
    }

    update(state) {
        state.scene = {
            spawn: gameObject => {
                this.spawn(gameObject);
                gameObject.start && gameObject.start(state);
            }
        };
        this.objects.forEach(gameObject => gameObject.update && gameObject.update(state));
    }

    lateUpdate(state) {
        state.scene = {
            spawn: gameObject => {
                this.spawn(gameObject);
                gameObject.start && gameObject.start(state);
            }
        };
        this.objects.forEach(gameObject => gameObject.lateUpdate && gameObject.lateUpdate(state));
    }
}