class Game {
    start() {
        const { WIN, CANVAS_ID, START_SCENE_ID } = CONFIG;

        const scene = new Scene(SCENES[START_SCENE_ID] || DEFAULT_SCENE);

        const physic = new Physic(scene);

        this.keyboardInput = new KeyboardInput();
        this.mouseInput = new MouseInput(CANVAS_ID);

        this.keyboardInput.enable();
        this.mouseInput.enable();

        const camera = new Camera(new CanvasDrawer({ id: CANVAS_ID, WIN }), this.mouseInput);

        const state = {
            camera,
            keyboard: this.keyboardInput,
            mouse: this.mouseInput,
            physic
        }

        let timestamp = Date.now();

        scene.start(state);

        const update = () => {
            const currentTimestamp = Date.now();
            const deltaTime = currentTimestamp - timestamp;
            timestamp = currentTimestamp;

            state.deltaTime = deltaTime / 1000;
            physic.update(state);
            scene.update(state);
            scene.lateUpdate(state);
    
            camera.render(scene);

            this.requestId = window.requestAnimationFrame(update);
        }

        update();
    }

    stop() {
        this.keyboardInput?.disable();
        this.mouseInput?.disable();
        window.cancelAnimationFrame(this.requestId);
    }
}