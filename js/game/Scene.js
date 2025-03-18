class Scene {
    constructor({ objects = [] } = {}) {
        this.objects = objects;
    }
    
    spawn(gameObject) {
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
        state.scene = {};
        this.objects.forEach(gameObject => gameObject.update && gameObject.update(state));
    }
}