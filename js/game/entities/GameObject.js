class GameObject {
    constructor({ name, position, model, angle, layer, children }) {
        this.name = name || 'new GameObject';
        this.position = position || vMath.zero();
        this.model = model || [];
        this.angle = angle || 0;
        this.layer = layer || 0;
        this.children = children || [];
    }

    appendChild(gameObject) {
        this.children.push(gameObject);
    }
    
    translate(offset) {
        this.position = vMath.add(this.position, offset);
        this.children.forEach(child => child.translate(offset));
    }

    forward() {
        return vMath.forward(this.angle);
    }

    lookAt(point) {
        this.angle = vMath.angle(vMath.sub(point, this.position));
    }
}