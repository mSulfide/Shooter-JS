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
            position: vMath.add(vMath.prod(this.forward(), 0.2), this.position),
            angle: this.angle,
            model: MODELS.bullet,
            layer: this.layer - 0.01,
            speed: 10
        });
        this.scene.spawn(bullet);
    }
    
    start({ scene }) {
        this.scene = scene;
    }

    update({ deltaTime }) {
        const eps = 0.001;
        const norm = angle => angle >= -Math.PI && angle < Math.PI ? angle : angle - Math.round(angle / Math.PI / 2) * Math.PI * 2;
        this.angle = norm(this.angle);
        
        const delta = norm(this.aim - this.angle);
        if (Math.abs(delta) > eps) {
            const dir = delta > 0 ? 1 : -1;
            this.angle += dir * Math.min(Math.abs(delta), this.speed * deltaTime);
        }
        
        if (this.delay > 0) {
            this.delay -= deltaTime;
        }
        else if (this.isFire) {
            this.fire();
        }
    }
}