class Physic {
    constructor(scene) {
        this.scene = scene;
    }

    update(state) {
        const isCollision = (a, b) => a.radius + b.radius > vMath.distance(a.position, b.position);

        const objects = this.scene.objects.filter(gameObject => gameObject instanceof PhysicalBody);
        objects.forEach(a => {
            objects.forEach(b => {
                if (a !== b && isCollision(a, b)) {
                    const normal = vMath.norm(vMath.sub(a.position, b.position));
                    const hitInfo = {
                        normal,
                        position: vMath.add(vMath.prod(normal, b.radius), b.position),
                        impulse: vMath.prod(normal, vMath.scal(b.velocity, normal) * b.mass)
                    };
                    a.collisionHandler(hitInfo);
                }
            });
            a.fixedUpdate(state);
        });
    }
}