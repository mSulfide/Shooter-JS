class Animator {
    constructor() {
        this.clips = [];
    }

    add(animation, setModel, loop = false) {
        const clip = {
            time: 0,
            animation,
            loop,
            setModel,
            played: false
        };
        this.clips.push(clip);
        const play = callback => {
            clip.played = true;
            clip.time = 0;
            clip.callback = callback;
        }
        const stop = () => clip.played = false;
        const clear = () => this.remove(clip);
        return [play, stop, clear];
    }

    remove(clip) {
        this.clips.splice(this.clips.indexOf(clip), 1);
    }

    update({ deltaTime }) {
        this.clips.filter(({ played }) => played).forEach(clip => {
            clip.time += deltaTime;
            clip.setModel(clip.animation.getModel(clip.time));
            if (clip.time > clip.animation.size()) {
                clip.time = 0;
                clip.callback && clip.callback();
                if (!clip.loop)
                    clip.played = false;
            }
        });
    }
}