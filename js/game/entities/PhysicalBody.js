class PhysicalBody extends GameObject {
    constructor(props) {
        super(props);
        this.radius = props.radius || 0;
        this.mass = props.mass || 1;
        this.velocity = vMath.zero();
        this.qVelocity = vMath.zero();
    }

    collisionHandler({ normal, impulse }) {
        if (vMath.scal(normal, this.velocity) < 0)
            this.velocity = vMath.sub(this.velocity, vMath.prod(normal, vMath.scal(normal, this.velocity)));
        if (vMath.scal(normal, impulse) > 0)
            this.velocity = vMath.add(this.velocity, vMath.prod(impulse, 1 / this.mass));
    }

    fixedUpdate({ deltaTime }) {
        this.translate(vMath.prod(vMath.add(this.velocity, this.qVelocity), deltaTime));
        
        this.qVelocity = vMath.zero();
    }
}