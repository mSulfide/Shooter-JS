class Bullet extends GameObject {
    constructor(props) {
        super(props);
        this.speed = props.speed || 1;
    }

    update({ deltaTime }) {
        this.translate(vMath.prod(this.forward(), deltaTime * this.speed));
    }
}