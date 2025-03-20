class VMath {
    add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }

    sub(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    }

    prod(a, num) {
        return {
            x: a.x * num,
            y: a.y * num
        }
    }

    scal(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    sqrModul(a) {
        return this.scal(a, a);
    }

    modul(a) {
        return Math.sqrt(this.sqrModul(a));
    }

    norm(a) {
        const len = this.modul(a);
        if (len !== 0)
            return {
                x: a.x / len,
                y: a.y / len
            };
        return this.zero();
    }

    angle(a) {
        return Math.atan2(a.y, a.x);
    }

    rotate(a, angle) {
        if (typeof angle === 'number')
            return {
                x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
                y: a.x * Math.sin(angle) + a.y * Math.cos(angle)
            };
        return { x: a.x, y: a.y };
    }

    forward(angle) {
        return this.rotate({ x: 1, y: 0 }, angle);
    }

    lerp(a, b, step) {
        const delta = this.sub(b, a);
        const offset = this.sqrModul(delta) > step * step ? this.prod(this.norm(delta), step) : delta;
        return this.add(a, offset);
    }

    lerpAngle(a, b, step) {
        const norm = angle => angle >= -Math.PI && angle < Math.PI ? angle : angle - Math.round(angle / Math.PI / 2) * Math.PI * 2;
        
        const delta = norm(b - a);
        const dir = delta > 0 ? 1 : -1;
        return norm(a + dir * Math.min(Math.abs(delta), step));
    }

    zero() {
        return { x: 0, y: 0 };
    }
}

const vMath = new VMath();