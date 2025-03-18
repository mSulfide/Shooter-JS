const DEFAULT_LINE = {
    COLOR: '#162',
    WIDTH: 2
}

const DEFAULT_COLOR = '#bfb';

class CanvasDrawer {
    constructor({ id, WIN }) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.WIN = WIN;
    }

    xs(x) {
        return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
    }

    ys(y) {
        return ((this.WIN.BOTTOM - y) / this.WIN.HEIGHT + 1) * this.canvas.height;
    }

    x(xs) {
        return xs * this.WIN.WIDTH / this.canvas.width + this.WIN.LEFT;
    }

    y(ys) {
        return this.WIN.BOTTOM - (ys / this.canvas.height - 1) * this.WIN.HEIGHT;
    }

    clear(color) {
        this.context.fillStyle = color || window.getComputedStyle(this.canvas).backgroundColor || DEFAULT_COLOR;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(p1, p2, color, width) {
        this.context.beginPath();
        this.context.strokeStyle = color || DEFAULT_LINE.COLOR;
        this.context.lineWidth = width || DEFAULT_LINE.WIDTH;
        this.context.moveTo(this.xs(p1.x), this.ys(p1.y));
        this.context.lineTo(this.xs(p2.x), this.ys(p2.y));
        this.context.stroke();
        this.context.closePath();
    }

    contour(points, color, width) {
        this.context.beginPath();
        this.context.strokeStyle = color || DEFAULT_LINE.COLOR;
        this.context.lineWidth = width || DEFAULT_LINE.WIDTH;
        if (points instanceof Array && points.length > 1) {
            this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i <= points.length; i++) {
                const { x, y } = points[i % points.length];
                this.context.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.context.stroke();
        this.context.closePath();
    }

    polygon(points = [], color) {
        this.context.beginPath();
        this.context.fillStyle = color || DEFAULT_COLOR;
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y))
        }
        this.context.fill()
        this.context.closePath();
    }

    text(x, y, text, color) {
        this.context.font = "24pt arial";
        this.context.fillStyle = color || DEFAULT_LINE.COLOR;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
}