const DEATH_RADIUS = 2.5;

class Bullet extends GameObject {
    constructor(props) {
        super(props);
        this.speed = props.speed || 1;
    }

    update({ deltaTime }) {
        if (vMath.sqrModul(this.position) >= DEATH_RADIUS ** 2)
            this.destroy();
        this.translate(vMath.prod(this.forward(), deltaTime * this.speed));
    }
}