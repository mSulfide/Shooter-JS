const DEATH_DELAY = 10;

class Bullet extends PhysicalBody {
    constructor(props) {
        props.mass = props.mass || 0.2;
        props.radius = props.radius ?? 0.1
        super(props);
    }

    start() {
        this.delay = DEATH_DELAY;
    }

    update({ deltaTime }) {
        if (this.delay > 0)
            this.delay -= deltaTime;
        else
            this.destroy();
        this.angle = vMath.angle(this.velocity);
    }

    onCollision() {
        this.destroy();
    }
}