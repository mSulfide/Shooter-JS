class Camera {
    constructor(drawer, input) {
        this.drawer = drawer;
        this.mousePosition = vMath.zero();
        input?.addListener('mousemove', ({ offsetX, offsetY }) => {
            const x = this.drawer.x(offsetX);
            const y = this.drawer.y(offsetY);
            this.mousePosition = { x, y };
        });
    }

    render({ objects = [] } = {}) {
        const drawer = this.drawer;
        drawer.clear();
        objects.sort((a, b) => a.layer - b.layer).forEach(({ position, model, color, width, angle }) => {
            const points = model.map(point => vMath.add(vMath.rotate(point, angle), position));
            drawer.polygon(points)
            drawer.contour(points, color, width);
        });
    }
}