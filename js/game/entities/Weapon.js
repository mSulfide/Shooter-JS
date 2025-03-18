class Weapon extends GameObject {
    constructor(props) {
        super(props);
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
        mouse.addListener('mousedown', () => this.fire());
    }

    update({ camera }) {
        this.lookAt(camera.mousePosition);
    }
}