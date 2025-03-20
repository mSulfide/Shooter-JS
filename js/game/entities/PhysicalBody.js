class PhysicalBody extends GameObject {
    constructor(props) {
        super(props);
        this.radius = props.radius || 0;
        this.mass = props.mass || 1;
        this.velocity = vMath.zero();
    }

    collisionHandler({ normal, impulse }) {
        this.velocity = vMath.add(this.velocity, vMath.prod(impulse, 1 / this.mass));
    }

    fixedUpdate({ deltaTime }) {
        this.translate(vMath.prod(this.velocity, deltaTime));
    }
}