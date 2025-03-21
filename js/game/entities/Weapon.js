class Weapon extends GameObject {
    constructor(props) {
        props.model = MODELS.weapon;
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
            angle: this.angle,
            radius: 0.1,
            mass: 0.25
        });
        const fire = EFFECTS.fire();
        fire.position = vMath.add(vMath.prod(this.forward(), 0.65), this.position);
        fire.angle = this.angle;
        fire.layer = this.layer - 0.005;
        this.scene.spawn(fire);
        bullet.velocity = vMath.prod(this.forward(), 10);
        this.scene.spawn(bullet);
        this.play();
    }

    start({ scene, animator }) {
        this.scene = scene;
        const [play] = animator.add(new GameAnimation([{
            name: 'weapon',
            time: 0.1
        }, {
            name: 'weaponFired',
            time: 0.12
        }]), model => this.model = model, false)
        this.play = play;
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