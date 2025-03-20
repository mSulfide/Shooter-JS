const DEATH_RADIUS = 10;

class Bullet extends PhysicalBody {
    constructor(props) {
        props.mass = props.mass || 0.2;
        props.radius = props.radius ?? 0.1
        super(props);
    }

    update() {
        if (vMath.sqrModul(this.position) >= DEATH_RADIUS ** 2)
            this.destroy();
    }
}