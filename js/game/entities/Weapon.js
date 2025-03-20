class Weapon extends GameObject {
    constructor(props) {
        super(props);
        this.cooldown = props.cooldown || 0.2;
        this.speed = props.speed || Math.PI * 4;
        this.delay = 0;
        this.aim = this.angle;
        this.isFire = false;
    }

    lookAt(point) {
        this.aim = vMath.angle(vMath.sub(point, this.position));
    }

    fire() {
        this.delay = this.cooldown;
        const bullet = new Bullet({
            name: 'bullet',
            position: vMath.add(vMath.prod(this.forward(), 0.7), this.position),
            model: MODELS.bullet,
            layer: this.layer - 0.01,
            radius: 0.1,
            mass: 0.5
        });
        bullet.velocity = vMath.prod(this.forward(), 10);
        this.scene.spawn(bullet);
    }
    
    start({ scene }) {
        this.scene = scene;
    }

    update({ deltaTime }) {
        this.angle = vMath.lerpAngle(this.angle, this.aim, this.speed * deltaTime);
        
        if (this.delay > 0) {
            this.delay -= deltaTime;
        }
        else if (this.isFire) {
            this.fire();
        }
    }
}