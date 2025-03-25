class Effect extends GameObject {
    constructor(props) {
        props.layer = props.layer ?? 2;
        super(props);
        this.animation = props.animation;
        this.loop = props.loop;
    }

    start({ animator }) {
        const [play, , clear] = animator.add(this.animation, model => this.model = model, this.loop);
        play(() => this.loop || this.destroy());
        this.onDestroy = () => clear();
    }
}