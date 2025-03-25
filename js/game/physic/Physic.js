class Physic {
    constructor(scene) {
        this.scene = scene;
        this.id = 0;
    }

    findAllCollisions(objects) {
        const isCollision = (a, b) => a.radius + b.radius > vMath.distance(a.position, b.position);

        this.id++;
        const collisions = [];
        objects.forEach(a => objects.forEach(b => {
            if (a !== b && isCollision(a, b)) {
                const position = vMath.add(a.position, vMath.prod(vMath.sub(a.position, b.position), 0.5));
                const normal = vMath.norm(vMath.sub(a.position, b.position));
                const allImpulse = vMath.scal(a.velocity, vMath.prod(normal, -1)) * a.mass + vMath.scal(b.velocity, normal) * b.mass
                const impulse = vMath.prod(normal, allImpulse / 2);
                const inseption = Math.abs(a.radius + b.radius - vMath.distance(a.position, b.position))
                if (inseption > 0.1)
                    a.qVelocity = vMath.prod(normal, inseption * b.mass / a.mass);
                collisions.push({ collider: a, hitInfo: { collider: b, normal, impulse, position } });
            }
        }));

        return collisions;
    }

    update(state) {
        const objects = this.scene.objects.filter(gameObject => gameObject instanceof PhysicalBody);

        const collisions = this.findAllCollisions(objects);
        collisions.forEach(({ collider, hitInfo }) => collider.collisionHandler(hitInfo));
        collisions.forEach(({ collider, hitInfo }) => collider.onCollision && collider.onCollision(hitInfo));

        objects.forEach(object => object.fixedUpdate(state));
    }
}