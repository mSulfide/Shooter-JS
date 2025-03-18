class GameObject {
    constructor({ name, position, model, angle, layer }) {
        this.name = name || 'new GameObject';
        this.position = position || vMath.zero();
        this.model = model || [];
        this.angle = angle || Math.PI / 2;
        this.layer = layer || 0;
    }

    forward() {
        return vMath.forward(this.angle);
    }

    lookAt(point) {
        this.angle = vMath.angle(vMath.sub(point, this.position));
    }
}