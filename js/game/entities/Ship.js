class Ship extends GameObject {
    constructor(props) {
        super(props);
        this.speed = props.speed || 3;
        this.acceleration = props.acceleration || 7;
        this.agility = props.agility || Math.PI;
        this.angAcceleration = props.angAcceleration || 7;
        this.thrust = 0;
        this.velocity = vMath.zero();
        this.rotation = 0;
        this.angVelocity = 0;
    }

    update({ deltaTime }) {
        this.velocity = vMath.lerp(this.velocity, vMath.prod(this.forward(), this.thrust * this.speed), this.acceleration * deltaTime);
        this.translate(vMath.prod(this.velocity, deltaTime));

        const lerp = (a, b, step) => {
            const delta = Math.abs(a - b);
            const direction = a < b ? 1 : -1;
            return a + direction * Math.min(delta, step);
        }
        this.angVelocity = lerp(this.angVelocity, this.rotation * this.agility, this.angAcceleration * deltaTime);
        this.angle += this.angVelocity * deltaTime;
    }
}