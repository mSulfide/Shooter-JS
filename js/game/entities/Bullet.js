class Bullet extends GameObject {
    constructor(props) {
        super(props);
        this.speed = props.speed || 1;
    }

    update({ deltaTime }) {
        this.position = vMath.add(this.position, vMath.prod(this.forward(), deltaTime * this.speed));
    }
}