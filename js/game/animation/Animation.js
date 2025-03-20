class Animation {
    constructor(frames, gameObject) {
        this.frames = frames;
        this.gameObject = gameObject;
    }

    size() {
        return this.frames.map(({ time }) => time).reduce((size, time) => size += time);
    }

    setModel(time) {
        this.gameObject.model = this.getModel(time);
    }

    getModel(time) {
        const size = this.size();
        let currentTime = time - Math.floor(time / size) * size;
        for (let i = 0; i < this.frames.length; i++) {
            const { name, time } = this.frames[i]
            currentTime -= time;
            if (currentTime <= 0)
                return MODELS[name];
        }
    }
}