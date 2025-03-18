class Weapon extends GameObject {
    constructor(props) {
        super(props);
        this.cooldown = props.cooldown || 0.2;
        this.delay = 0;
    }

    fire() {
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
    
    start({ mouse, scene }) {
        this.scene = scene;
        mouse.addListener('mousedown', () => this.isFire = true);
        mouse.addListener('mouseup', () => this.isFire = false);
    }

    update({ camera, deltaTime }) {
        this.lookAt(camera.mousePosition);

        if (this.delay > 0) {
            this.delay -= deltaTime;
        }
        else if (this.isFire) {
            this.delay = this.cooldown;
            this.fire();
        }
    }
}