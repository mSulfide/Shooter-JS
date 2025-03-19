class Ship extends GameObject {
    constructor(props) {
        super(props);
        this.speed = props.speed || 3;
        this.agility = props.agility || Math.PI;
        this.thrust = 0;
        this.rotation = 0;
    }

    update({ deltaTime }) {
        this.translate(vMath.prod(this.forward(), deltaTime * this.thrust * this.speed));

        this.angle += this.rotation * this.agility * deltaTime;
    }
}